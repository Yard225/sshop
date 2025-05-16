# SShop - Architecture Microservices avec NestJS

Ce projet est une implémentation d'une architecture microservices pour une plateforme e-commerce, construite avec NestJS.

## Structure du Projet

```
sshop/
├── .github/                   # CI/CD, templates, workflows
├── infra/                     # Infrastructure (K8s, Terraform)
├── packages/                  # Bibliothèques partagées
├── services/                  # Microservices NestJS
├── platform/                  # Composants transverses
├── tests/                     # Tests globaux
└── docs/                      # Documentation
```

## Prérequis

- Node.js 20+
- pnpm 8+
- Docker & Docker Compose
- Kubernetes (pour le déploiement)

## Installation

```bash
pnpm install
```

## Développement

```bash
# Lancer tous les services
pnpm dev

# Lancer un service spécifique
pnpm dev:service catalog-svc
```

## Tests

```bash
# Lancer tous les tests
pnpm test

# Lancer les tests d'un service
pnpm test:service catalog-svc
```

## Build

```bash
pnpm build
```

## Architecture

Le projet suit une architecture hexagonale (ports & adapters) avec une séparation claire des couches :

- Core (Domaine)
- Adapters (Infrastructure)
- Controllers (Interface)

Chaque microservice est indépendant et communique via des événements ou des appels API.