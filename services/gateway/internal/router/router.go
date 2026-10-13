package router

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"time"

	"id.griyaku/gateway/internal/config"
	gwMiddleware "id.griyaku/gateway/internal/middleware"
	"id.griyaku/gateway/internal/proxy"

	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func New(cfg *config.Config, logger *slog.Logger) (*chi.Mux, error) {
	r := chi.NewRouter()

	// 1. Recover panic
	r.Use(chiMiddleware.Recoverer)
	// 2. Request ID
	r.Use(chiMiddleware.RequestID)
	// 3. Strip client internal headers (security)
	r.Use(gwMiddleware.StripClientInternalHeaders)
	// 4. OWASP Security headers
	r.Use(gwMiddleware.SecurityHeaders)
	// 5. OWASP Request Body Limit (5MB)
	r.Use(gwMiddleware.OWASPBodySizeLimit(5 * 1024 * 1024))
	// 6. OWASP Input Sanitizer (SQLi & XSS protection)
	r.Use(gwMiddleware.OWASPInputSanitizer)
	// 7. OWASP Rate Limiter (120 req/min per IP)
	r.Use(gwMiddleware.OWASPRateLimiter(120))
	// 5. CORS
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   cfg.AllowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "Idempotency-Key"},
		ExposedHeaders:   []string{"Link", "X-Request-Id"},
		AllowCredentials: true,
		MaxAge:           300,
	}))
	// 6. Access log slog JSON
	r.Use(gwMiddleware.RequestLogger(logger))

	// Liveness Probe
	r.Get("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{
			"status":    "ok",
			"timestamp": time.Now().UTC().Format(time.RFC3339),
		})
	})

	// Readiness Probe
	r.Get("/readyz", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{
			"status":   "ready",
			"upstream": cfg.UpstreamCoreURL,
		})
	})

	// Upstream Proxy
	upstreamProxy, err := proxy.NewUpstreamProxy(cfg.UpstreamCoreURL, cfg.GatewayInternalSecret, logger)
	if err != nil {
		return nil, err
	}

	r.Route("/api/v1", func(sub chi.Router) {
		// Proxy /api/v1/ping dan seluruh rute upstream
		sub.HandleFunc("/ping", upstreamProxy.ServeHTTP)
		sub.HandleFunc("/*", upstreamProxy.ServeHTTP)
	})

	return r, nil
}
