package proxy

import (
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"net/url"
	"time"

	gwMiddleware "id.griyaku/gateway/internal/middleware"

	"github.com/go-chi/chi/v5/middleware"
)

type UpstreamProxy struct {
	targetURL      *url.URL
	httpClient     *http.Client
	internalSecret string
	logger         *slog.Logger
}

func NewUpstreamProxy(targetURLStr, internalSecret string, logger *slog.Logger) (*UpstreamProxy, error) {
	u, err := url.Parse(targetURLStr)
	if err != nil {
		return nil, fmt.Errorf("invalid upstream URL: %w", err)
	}

	return &UpstreamProxy{
		targetURL: u,
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
		internalSecret: internalSecret,
		logger:         logger,
	}, nil
}

type ProblemDetail struct {
	Type     string `json:"type"`
	Title    string `json:"title"`
	Status   int    `json:"status"`
	Detail   string `json:"detail"`
	Instance string `json:"instance"`
	TraceID  string `json:"traceId"`
}

func (p *UpstreamProxy) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	reqID := middleware.GetReqID(r.Context())
	if reqID == "" {
		reqID = fmt.Sprintf("req-%d", time.Now().UnixNano())
	}

	destURL := *p.targetURL
	destURL.Path = r.URL.Path
	destURL.RawQuery = r.URL.RawQuery

	proxyReq, err := http.NewRequestWithContext(r.Context(), r.Method, destURL.String(), r.Body)
	if err != nil {
		p.respondProblem(w, http.StatusInternalServerError, "Gagal Membuat Permintaan Proxy", err.Error(), r.URL.Path, reqID)
		return
	}

	// Salin header klien
	for key, values := range r.Header {
		for _, val := range values {
			proxyReq.Header.Add(key, val)
		}
	}

	// Injeksi header internal bertanda tangan HMAC
	signedHeaders, _ := gwMiddleware.InjectInternalHeaders(p.internalSecret, "", "", reqID)
	for k, v := range signedHeaders {
		proxyReq.Header.Set(k, v)
	}

	resp, err := p.httpClient.Do(proxyReq)
	if err != nil {
		p.logger.Warn("Upstream core-api connection failed, returning fallback or problem", slog.String("error", err.Error()))
		// Jika upstream sedang down, kembalikan RFC 9457 ProblemDetail
		p.respondProblem(w, http.StatusBadGateway, "Upstream Service Unavailable",
			"Core API sedang tidak dapat dihubungi. Pastikan Spring Boot berjalan di port 8081.",
			r.URL.Path, reqID)
		return
	}
	defer resp.Body.Close()

	// Teruskan header upstream
	for key, values := range resp.Header {
		for _, val := range values {
			w.Header().Add(key, val)
		}
	}
	w.WriteHeader(resp.StatusCode)
	_, _ = io.Copy(w, resp.Body)
}

func (p *UpstreamProxy) respondProblem(w http.ResponseWriter, status int, title, detail, instance, traceID string) {
	w.Header().Set("Content-Type", "application/problem+json")
	w.WriteHeader(status)

	prob := ProblemDetail{
		Type:     "https://api.griyaku.id/errors/upstream-error",
		Title:    title,
		Status:   status,
		Detail:   detail,
		Instance: instance,
		TraceID:  traceID,
	}
	_ = json.NewEncoder(w).Encode(prob)
}
