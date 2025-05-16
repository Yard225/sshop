# ordering-svc

Ce service gère la prise de commande, le panier et l'orchestration du paiement et de l'expédition.

## Ownership
- Équipe : Ordering
- Contact : ordering-team@votre-entreprise.com

## Endpoints principaux
- `POST /orders` : créer une commande
- `GET /orders` : lister les commandes
- `PATCH /orders/:id` : mettre à jour une commande

## Dossiers clés
- `src/core` : logique métier (agrégats, entités, value objects, use-cases)
- `src/adapters` : infrastructure (ORM, events, mappers)
- `src/controllers` : API REST/GraphQL

## ADR locaux
Voir le dossier `docs/adr/` pour les décisions d'architecture locales.