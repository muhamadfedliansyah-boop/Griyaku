package middleware

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"log/slog"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/go-chi/chi/v5/middleware"
)

// SecurityHeaders menambahkan header keamanan standar OWASP Top 10
func SecurityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// OWASP: Mencegah MIME sniffing
		w.Header().Set("X-Content-Type-Options", "nosniff")
		// OWASP: Mencegah Clickjacking
		w.Header().Set("X-Frame-Options", "DENY")
		// OWASP: Mencegah XSS di browser lawas
		w.Header().Set("X-XSS-Protection", "1; mode=block")
		// OWASP: Proteksi kebocoran URL referrer
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		// OWASP: Content Security Policy ketat
		w.Header().Set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' http: ws:;")
		// OWASP: HSTS (Strict-Transport-Security)
		w.Header().Set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
		// OWASP: Membatasi izin fitur browser yang berisiko
		w.Header().Set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
		next.ServeHTTP(w, r)
	})
}

// OWASPBodySizeLimit membatasi ukuran body request untuk mencegah DoS / Buffer Exhaustion (Max 5MB)
func OWASPBodySizeLimit(maxBytes int64) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			r.Body = http.MaxBytesReader(w, r.Body, maxBytes)
			next.ServeHTTP(w, r)
		})
	}
}

// OWASPInputSanitizer memeriksa adanya pola injeksi berbahaya (SQLi & XSS sederhana) pada query URL
func OWASPInputSanitizer(next http.Handler) http.Handler {
	dangerousPatterns := []string{
		"<script", "</script", "javascript:", "onerror=", "onload=",
		"union select", "--", "; drop table", "' or 1=1", "xp_cmdshell",
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rawQuery := strings.ToLower(r.URL.RawQuery)
		for _, pattern := range dangerousPatterns {
			if strings.Contains(rawQuery, pattern) {
				http.Error(w, `{"error":"Permintaan ditolak oleh filter keamanan OWASP"}`, http.StatusBadRequest)
				return
			}
		}
		next.ServeHTTP(w, r)
	})
}

// SimpleRateLimiter melindungi endpoint dari brute-force dan DoS (OWASP API4:2023 Unrestricted Resource Consumption)
type clientRate struct {
	tokens     int
	lastRefill time.Time
}

var (
	rateMutex sync.Mutex
	clients   = make(map[string]*clientRate)
)

func OWASPRateLimiter(maxPerMinute int) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ip := r.RemoteAddr
			if colonIdx := strings.LastIndex(ip, ":"); colonIdx != -1 {
				ip = ip[:colonIdx]
			}

			rateMutex.Lock()
			now := time.Now()
			cr, exists := clients[ip]
			if !exists || now.Sub(cr.lastRefill) > time.Minute {
				clients[ip] = &clientRate{tokens: maxPerMinute - 1, lastRefill: now}
				rateMutex.Unlock()
				next.ServeHTTP(w, r)
				return
			}

			if cr.tokens <= 0 {
				rateMutex.Unlock()
				w.Header().Set("Retry-After", "60")
				http.Error(w, `{"error":"Terlalu banyak permintaan (Rate limit exceeded)"}`, http.StatusTooManyRequests)
				return
			}

			cr.tokens--
			rateMutex.Unlock()
			next.ServeHTTP(w, r)
		})
	}
}

// StripClientInternalHeaders membuang header internal yang dikirim oleh klien luar
func StripClientInternalHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		r.Header.Del("X-User-Id")
		r.Header.Del("X-User-Role")
		r.Header.Del("X-Gateway-Signature")
		next.ServeHTTP(w, r)
	})
}

// RequestLogger mencatat access log terstruktur JSON dengan slog
func RequestLogger(logger *slog.Logger) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			ww := middleware.NewWrapResponseWriter(w, r.ProtoMajor)

			next.ServeHTTP(ww, r)

			duration := time.Since(start)
			reqID := middleware.GetReqID(r.Context())

			logger.Info("HTTP request",
				slog.String("method", r.Method),
				slog.String("path", r.URL.Path),
				slog.Int("status", ww.Status()),
				slog.Duration("duration", duration),
				slog.String("requestId", reqID),
				slog.String("remoteAddr", r.RemoteAddr),
			)
		})
	}
}

// SignInternalHeader membuat HMAC SHA256 signature untuk verifikasi antar layanan internal
func SignInternalHeader(payload, secret string) string {
	h := hmac.New(sha256.New, []byte(secret))
	h.Write([]byte(payload))
	return hex.EncodeToString(h.Sum(nil))
}

// InjectInternalHeaders menyuntikkan header bertanda tangan ke upstream core-api
func InjectInternalHeaders(secret, userID, userRole, reqID string) (map[string]string, error) {
	headers := make(map[string]string)
	if reqID == "" {
		reqID = fmt.Sprintf("req-%d", time.Now().UnixNano())
	}
	headers["X-Request-Id"] = reqID
	if userID != "" {
		headers["X-User-Id"] = userID
	}
	if userRole != "" {
		headers["X-User-Role"] = userRole
	}

	payload := fmt.Sprintf("%s:%s:%s", userID, userRole, reqID)
	headers["X-Gateway-Signature"] = SignInternalHeader(payload, secret)

	return headers, nil
}
