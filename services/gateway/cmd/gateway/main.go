package main

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"id.griyaku/gateway/internal/config"
	"id.griyaku/gateway/internal/router"
)

func main() {
	// Logger terstruktur JSON sesuai standar observability
	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))
	slog.SetDefault(logger)

	cfg := config.Load()

	r, err := router.New(cfg, logger)
	if err != nil {
		logger.Error("Gagal menginisialisasi router", slog.String("error", err.Error()))
		os.Exit(1)
	}

	addr := fmt.Sprintf(":%s", cfg.Port)
	srv := &http.Server{
		Addr:         addr,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Server shutdown channel
	shutdownChan := make(chan os.Signal, 1)
	signal.Notify(shutdownChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		logger.Info("Griyaku API Gateway aktif",
			slog.String("port", cfg.Port),
			slog.String("upstream", cfg.UpstreamCoreURL),
		)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Error("Kesalahan server Gateway", slog.String("error", err.Error()))
			os.Exit(1)
		}
	}()

	<-shutdownChan
	logger.Info("Memulai graceful shutdown Gateway...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Error("Kesalahan saat graceful shutdown", slog.String("error", err.Error()))
	} else {
		logger.Info("Griyaku API Gateway berhasil dimatikan secara bersih")
	}
}
