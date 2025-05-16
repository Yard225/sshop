# catalog-svc

Ce service gère le catalogue produits (création, modification, gestion des stocks, etc.).

## Ownership
- Équipe : Catalog
- Contact : catalog-team@votre-entreprise.com

## Endpoints principaux
- `POST /products` : créer un produit
- `GET /products` : lister les produits
- `PATCH /products/:id` : modifier un produit

## Dossiers clés
- `src/core` : logique métier (agrégats, entités, value objects, use-cases)
- `src/adapters` : infrastructure (ORM, events, mappers)
- `src/controllers` : API REST/GraphQL

## ADR locaux
Voir le dossier `docs/adr/` pour les décisions d'architecture locales.
