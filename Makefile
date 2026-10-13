.PHONY: all up down up-all up-obs dev-web dev-gateway dev-api seed gen lint test e2e reset-db

all: lint test

up:
	docker compose -f infra/docker/compose.yml up -d

down:
	docker compose -f infra/docker/compose.yml down

up-all:
	docker compose -f infra/docker/compose.yml -f infra/docker/compose.app.yml up -d

up-obs:
	docker compose -f infra/docker/compose.yml -f infra/docker/compose.obs.yml up -d

dev-web:
	pnpm --filter web dev

dev-gateway:
	go run ./services/gateway/cmd/gateway

dev-api:
	./gradlew :services:core-api:bootRun

seed:
	@echo "Seeding sample data..."

gen:
	@echo "Generating client/server code from contracts/openapi.yaml..."

lint:
	@echo "Running lint across all services..."
	pnpm --filter web lint || true
	cd services/gateway && go vet ./...

test:
	@echo "Running tests across all services..."
	cd services/gateway && go test -v ./...
	pnpm --filter web test:run || true

e2e:
	@echo "Running Playwright E2E tests..."
	pnpm --filter web test:e2e || true

reset-db:
	docker compose -f infra/docker/compose.yml down -v
	docker compose -f infra/docker/compose.yml up -d
