# Mercadinho Backend

Backend do Mercadinho, um marketplace de eletrônicos construído com NestJS.

## Tecnologias

### Core

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Redis

### Infraestrutura

- Docker
- Docker Compose
- GitHub Actions

### Observabilidade

- Pino
- Correlation ID
- Health Checks
- Prometheus
- Grafana

### Documentação

- Swagger / OpenAPI

---

# Arquitetura

```txt
src/
├── common/
│   ├── middleware/
│   ├── filters/
│   ├── prisma/
│   ├── redis/
│   ├── observability/
│   └── swagger/
│
├── modules/
│   └── health/
│
├── shared/
│
├── app.module.ts
└── main.ts
```

---

# Requisitos

- Node.js 22+
- PNPM
- Docker
- Docker Compose

---

# Instalação

```bash
pnpm install
```

---

# Configuração

Copie os arquivos de exemplo:

```bash
cp docker/app/compose.example.yml docker/app/compose.yml

cp docker/postgres/compose.example.yml docker/postgres/compose.yml

cp docker/redis/compose.example.yml docker/redis/compose.yml

cp docker/compose.example.yml docker/compose.yml
```

---

# Executando infraestrutura

```bash
docker compose -f docker/compose.yml up -d
```

---

# Executando aplicação

```bash
pnpm start:dev
```

---

# Banco de dados

## Gerar cliente Prisma

```bash
pnpm prisma generate
```

## Criar migration

```bash
pnpm prisma migrate dev --name migration_name
```

## Aplicar migrations

```bash
pnpm prisma migrate deploy
```

---

# Seeds

Executar seeds:

```bash
pnpm seed
```

Estrutura:

```txt
prisma/
└── seed/
    ├── index.ts
    ├── modules/
    │   ├── development/
    │   ├── staging/
    │   └── production/
    └── factories/
```

---

# Observabilidade

## Health Check

```http
GET /api/health
```

## Readiness Check

```http
GET /api/health/ready
```

## Métricas

```http
GET /api/metrics
```

---

# Documentação da API

Swagger:

```txt
http://localhost:3000/docs
```

---

# Qualidade

## Lint

```bash
pnpm lint
```

## Corrigir lint

```bash
pnpm lint:fix
```

## Testes

```bash
pnpm test
```

## Coverage

```bash
pnpm test:cov
```

---

# Logs

A aplicação utiliza:

- Structured Logging
- Request Tracking
- Correlation ID

Header suportado:

```http
x-correlation-id
```

Caso não seja informado, um UUID será gerado automaticamente.

---

# Roadmap

## V0 — Foundation

- [x] NestJS Setup
- [x] Prisma Setup
- [x] PostgreSQL
- [x] Redis
- [x] Docker
- [x] Structured Logs
- [x] Correlation ID
- [x] Health Checks
- [x] Swagger
- [x] CI/CD Base
- [x] Seed Structure
- [x] Prometheus
- [x] Grafana

## V1 — Identity & Access

- [ ] Register
- [ ] Login
- [ ] Logout
- [ ] Refresh Token
- [ ] JWT Authentication
- [ ] Google OAuth
- [ ] Password Recovery
- [ ] Email Verification
- [ ] RBAC

## V2 — Catalog

- [ ] Categories
- [ ] Brands
- [ ] Products
- [ ] Product Images
- [ ] Product Search

## V3 — Marketplace

- [ ] Cart
- [ ] Orders
- [ ] Checkout
- [ ] Payments
- [ ] Inventory

## V4 — Platform

- [ ] Notifications
- [ ] Reviews
- [ ] Favorites
- [ ] Analytics

---

# Licença

UNLICENSED