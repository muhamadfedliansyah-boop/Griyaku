package router_test

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"testing"

	"id.griyaku/gateway/internal/config"
	"id.griyaku/gateway/internal/router"
)

func TestHealthAndReadyEndpoints(t *testing.T) {
	logger := slog.New(slog.NewJSONHandler(io.Discard, nil))
	cfg := &config.Config{
		Port:                  "8080",
		UpstreamCoreURL:       "http://localhost:8081",
		AllowedOrigins:        []string{"*"},
		GatewayInternalSecret: "test-secret",
	}

	r, err := router.New(cfg, logger)
	if err != nil {
		t.Fatalf("failed to create router: %v", err)
	}

	// Test /healthz
	reqHealth := httptest.NewRequest(http.MethodGet, "/healthz", nil)
	recHealth := httptest.NewRecorder()
	r.ServeHTTP(recHealth, reqHealth)

	if recHealth.Code != http.StatusOK {
		t.Errorf("expected 200 on /healthz, got %d", recHealth.Code)
	}

	var healthBody map[string]any
	if err := json.Unmarshal(recHealth.Body.Bytes(), &healthBody); err != nil {
		t.Fatalf("invalid json on /healthz: %v", err)
	}
	if healthBody["status"] != "ok" {
		t.Errorf("expected status 'ok', got %v", healthBody["status"])
	}

	// Test /readyz
	reqReady := httptest.NewRequest(http.MethodGet, "/readyz", nil)
	recReady := httptest.NewRecorder()
	r.ServeHTTP(recReady, reqReady)

	if recReady.Code != http.StatusOK {
		t.Errorf("expected 200 on /readyz, got %d", recReady.Code)
	}
}

func TestStripInternalHeaders(t *testing.T) {
	logger := slog.New(slog.NewJSONHandler(io.Discard, nil))
	cfg := &config.Config{
		Port:                  "8080",
		UpstreamCoreURL:       "http://localhost:8081",
		AllowedOrigins:        []string{"*"},
		GatewayInternalSecret: "test-secret",
	}

	r, err := router.New(cfg, logger)
	if err != nil {
		t.Fatalf("failed to create router: %v", err)
	}

	req := httptest.NewRequest(http.MethodGet, "/healthz", nil)
	req.Header.Set("X-User-Id", "spoofed-user")
	req.Header.Set("X-User-Role", "ADMIN")

	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	// Header harus sudah di-strip oleh StripClientInternalHeaders
	if req.Header.Get("X-User-Id") != "" {
		t.Errorf("expected X-User-Id to be stripped, got %s", req.Header.Get("X-User-Id"))
	}
	if req.Header.Get("X-User-Role") != "" {
		t.Errorf("expected X-User-Role to be stripped, got %s", req.Header.Get("X-User-Role"))
	}
}
