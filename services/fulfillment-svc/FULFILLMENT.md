# fulfillment-svc

Ce service gère la préparation, l'expédition et le suivi des colis.

## Ownership
- Équipe : Fulfillment
- Contact : fulfillment-team@votre-entreprise.com

## Endpoints principaux
- `POST /shipments` : enregistrer une expédition
- `GET /shipments/:id` : obtenir le statut d'une expédition
- `PATCH /shipments/:id` : mettre à jour le statut d'une expédition

## Dossiers clés
- `src/core` : logique métier (agrégats, entités, value objects, use-cases)
- `src/adapters` : infrastructure (ORM, events, mappers)
- `src/controllers` : API REST/GraphQL

## ADR locaux
Voir le dossier `docs/adr/` pour les décisions d'architecture locales.
