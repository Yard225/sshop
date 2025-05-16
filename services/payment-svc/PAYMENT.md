# payment-svc

Ce service gère le traitement des paiements, l'intégration Mobile Money, la confirmation et les remboursements.

## Ownership
- Équipe : Payment
- Contact : payment-team@votre-entreprise.com

## Endpoints principaux
- `POST /payments` : initier un paiement
- `GET /payments/:id` : obtenir le statut d'un paiement
- `POST /payments/:id/refund` : rembourser un paiement

## Dossiers clés
- `src/core` : logique métier (agrégats, entités, value objects, use-cases)
- `src/adapters` : infrastructure (ORM, events, mappers)
- `src/controllers` : API REST/GraphQL

## ADR locaux
Voir le dossier `docs/adr/` pour les décisions d'architecture locales.
