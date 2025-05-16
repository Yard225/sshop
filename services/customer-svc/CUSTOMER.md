# customer-svc

Ce service gère les profils clients, les préférences et les interactions (notifications, support).

## Ownership
- Équipe : Customer
- Contact : customer-team@votre-entreprise.com

## Endpoints principaux
- `POST /customers` : créer un client
- `GET /customers/:id` : obtenir le profil d'un client
- `PATCH /customers/:id` : mettre à jour un client

## Dossiers clés
- `src/core` : logique métier (agrégats, entités, value objects, use-cases)
- `src/adapters` : infrastructure (ORM, events, mappers)
- `src/controllers` : API REST/GraphQL

## ADR locaux
Voir le dossier `docs/adr/` pour les décisions d'architecture locales.
