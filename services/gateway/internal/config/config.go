package config

import (
	"os"
)

type Config struct {
	Port                  string
	UpstreamCoreURL       string
	AllowedOrigins        []string
	GatewayInternalSecret string
	RedisURL              string
}

func Load() *Config {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	upstream := os.Getenv("UPSTREAM_CORE_URL")
	if upstream == "" {
		upstream = "http://localhost:8081"
	}

	secret := os.Getenv("GATEWAY_INTERNAL_SECRET")
	if secret == "" {
		secret = "griyaku_gateway_internal_secret_key_32chars"
	}

	redisURL := os.Getenv("REDIS_URL")
	if redisURL == "" {
		redisURL = "redis://localhost:6379"
	}

	return &Config{
		Port:                  port,
		UpstreamCoreURL:       upstream,
		AllowedOrigins:        []string{"http://localhost:3000"},
		GatewayInternalSecret: secret,
		RedisURL:              redisURL,
	}
}
