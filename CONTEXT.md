Étape 1 – Définition du domaine

(Extraction DDD à valider avant de poursuivre)

Élément	Propositions pour le service Social-Shop WhatsApp
Bounded Contexts (BC)

1. Catalog Management – gestion du mini-catalogue (produits, variantes, prix, stocks).

2. Ordering & Checkout – panier, commande, validation.

3. Payment Processing – intégration Mobile Money, confirmation, remboursements.

4. Fulfillment & Tracking – préparation, expédition, suivi colis.

5. Customer Interaction – conversations WhatsApp, notifications, support.

Context Map (relations)	

Catalog Management publie ProductUpdated → consommé par Ordering (mise à jour des lignes de commande).

Ordering publie OrderPlaced → • Payment Processing réserve le paiement• Fulfillment crée l’expédition.

Payment Processing publie PaymentConfirmed/Failed → Ordering met à jour l’état de la commande.

Fulfillment publie ShipmentStatusChanged → Customer Interaction notifie le client.

Intégrations protégées par Anti-Corruption Layers (ACL) pour appels externes (API Mobile Money, API de tracking).

Agrégats principaux: 

ProductAggregate (root : Product) – variantes, 

stock OrderAggregate (root : Order) – OrderItems, total, état.

PaymentAggregate (root : PaymentTransaction) – montant, référence externe, statut.

ShipmentAggregate (root : Shipment) – transporteur, statut, historique (optionnel).

CustomerAggregate (root : Customer) – profil, préférences.

Entités internes:
ProductVariant, OrderItem, PaymentAttempt, ParcelCheckpoint, etc.

Value Objects	Money (amount, currency) • MobileMoneyReference • ProductSKU • PhoneNumber • Address • 
TrackingCode

Use Cases (Application Services):

Catalog: Create/Update Product, AdjustStock, ListCatalog.

Ordering: AddItemToCart, Checkout, CancelOrder.

Payment: InitiatePayment, ConfirmPayment, IssueRefund.

Fulfillment: RegisterShipment, UpdateShipmentStatus, GetTrackingInfo.

Customer Interaction: SendPaymentLink, SendOrderConfirmation, NotifyShipmentUpdate.

Domain Events:
ProductStockLow, OrderPlaced, PaymentConfirmed, PaymentFailed, ShipmentDispatched, ShipmentDelivered, ShipmentDelayed.

Invariants & Règles métier clés: 

Un Order ne peut passer à l’état Paid que si PaymentConfirmed.

Un Shipment ne peut être créé que pour une commande ReadyForShipment.

Le stock d’un ProductVariant ne peut devenir négatif.


⸻

Ce que cela signifie pour la suite
	•	Chaque BC sera implémenté comme un microservice (ou module interne si vous préférez un mono-repo), exposant ses propres ports (commands/queries, events).
	•	Les agrégats portent l’intégralité des invariants métier ; les value objects encapsulent toutes les validations (ex. format MSISDN, devise).
	•	Les domain events serviront de contrat d’intégration entre contextes et permettront un découplage via messaging ou event bus interne.

Étape 2 – Conception de l’architecture

(Clean Architecture ✕ Micro-services ✕ Feature Flags)

⸻

1. Panorama global

┌────────────── Monorepo (Nx / pnpm workspaces) ───────────────┐
│                                                              │
│  packages/                                                   │
│  ├── shared-kernel/        ←  Value Objects, base events     │
│  ├── shared-infra/         ←  Logger, config, feature flags  │
│  └── tooling/              ←  ESLint, ts-config, scripts     │
│                                                              │
│  services/                                                    │
│  ├── catalog-svc/          ←  BC Catalog Management          │
│  ├── ordering-svc/         ←  BC Ordering & Checkout         │
│  ├── payment-svc/          ←  BC Payment Processing          │
│  ├── fulfillment-svc/      ←  BC Fulfillment & Tracking      │
│  └── customer-svc/         ←  BC Customer Interaction        │
│                                                              │
│  platform/                                                    │
│  ├── api-gateway/          ←  GraphQL / REST façade          │
│  └── event-bus/            ←  Kafka / NATS streams           │
└──────────────────────────────────────────────────────────────┘

	•	Mono-repo pour faciliter le refactor, sans empêcher un déploiement indépendant ; chaque services/* est un package NestJS déployé sous forme de micro-service (container).
	•	Event Bus (Kafka ou NATS) transporte les domain events publiés par chaque service.
	•	API Gateway offre un point d’entrée HTTP(s) unique (GraphQL, REST) et relaie vers les services.
	•	Feature Flags centralisés (Unleash / Flagsmith) ; chaque service injecte un FeatureFlagService (from shared-infra) pour activer / désactiver du code ou aiguiller vers de nouvelles versions.

⸻

2. Détail d’un micro-service (ex. ordering-svc)

services/ordering-svc
├── src/
│   ├── core/                    ←  ❶ « Domaine »
│   │   ├── aggregates/
│   │   │   └── order.aggregate.ts
│   │   ├── entities/
│   │   ├── value-objects/
│   │   ├── events/
│   │   ├── repositories/        ←  interfaces (Ports sortie)
│   │   └── use-cases/           ←  application services
│   │
│   ├── adapters/                ←  ❷ « Infrastructure »
│   │   ├── out/                 ←  impl. repos, event/publisher
│   │   └── in/                  ←  mappers DTO→VO, ACL externes
│   │
│   ├── controllers/             ←  ❸ « Interface »
│   ├── exceptions/
│   └── config/
│
├── test/
│   ├── unit/       ←  cœur (core/)
│   ├── integration/←  ports + adapters
│   └── e2e/        ←  via API Gateway simulée
└── ...

Couche	Responsabilité	Dépend uniquement de…
Core	Pure domaine : entités, agrégats, VOs, règles métiers, use cases (application).	TypeScript standard, shared-kernel
Adapters	Implémentations techniques : ORM/Prisma, HTTP clients, publishers Kafka, intégrations Mobile Money SDK, etc.	Core (via interfaces), shared-infra
Controllers	Exposition HTTP/GraphQL ; mapping DTO ⇄ Commandes/Queries Core.	Core, Adapters (ports in)
Config	Injection des repos, feature flags, validation env.	shared-infra

Inversion de dépendance : Core ne connaît que des interfaces ; les implémentations concrètes vivent dans adapters/out et sont injectées par NestJS via providers.

⸻

3. Shared Kernel & Shared Infra

Package	Contenu	Exemples
shared-kernel	Artefacts purement domain-agnostiques réutilisables	Money, PhoneNumber, DomainEvent (base class), Result<T,E> helper
shared-infra	Cross-cutting techniques	LoggerService, ConfigService (dotenv, Vault), FeatureFlagService (Unleash SDK wrapper), TracingModule (OpenTelemetry), Health checks

Chaque service déclare :

@Module({
  imports: [
    SharedInfraModule.forRoot(),
    EventBusModule.forAsync('ordering'),
    FeatureFlagModule.register({ namespace: 'ordering' }),
  ],
})
export class OrderingAppModule {}


⸻

4. Orchestration & interactions inter-BC

Interaction	Transport recommandé	Raison
Event OrderPlaced → payment-svc	Kafka topic ordering.events	Asynchrone, scalable
Query /products/{id} (ordering → catalog)	REST interne via API Gateway (read-side) Lecture cohérente, faible volume
Command /payments/{id}/refund (customer → payment)	gRPC direct	Action critique, besoin faible latence
Feature Flag activate Promo-Beta	Flagsmith → all services	Roll-out progressif


⸻

5. Tests & pipelines

Niveau	Outil	Portée / but
Unit	Jest	Agrégats, value objects, use cases (pure)
Integration	Jest + Testcontainers	Repos ⇄ DB ; publisher Kafka ⇄ local broker; API avec NestJS TestingModule
Contract	Pact	Ordering emits event → Payment consumes
E2E	Cypress (API)	API-Gateway ⇄ micro-services with docker-compose
Static	ESLint, Sonar	Qualité, coverage

CI : GitHub Actions → lint / unit → build Docker → integration tests → publish image.
CD : ArgoCD / Helm per service, flags pilotés depuis Unleash UI.

⸻

6. Gouvernance des Feature Flags
	•	Naming : CONTEXT.FEATURE.ACTION (ex. PAYMENT.MOBILEMONEY.ENABLED).
	•	Lifecyle : experimental → beta → released → expired.
	•	Toggle points uniquement dans l’adapter ou use case concerné (pas de if-flag dans le cœur).
	•	Auditable : toutes décisions flag ON/OFF enregistrées dans Kibana.

⸻

7. Sécurité & transversal
	•	AuthN/Z : JWT opaque émis par Keycloak; Nest Guards au niveau API Gateway, ACL fine dans services.
	•	Observabilité : tracing OpenTelemetry ; méta-données de DomainEvent enrichies de traceId.
	•	Transactions : Saga local transaction pattern dans ordering-svc pour orchestrer Order→Payment→Shipment.