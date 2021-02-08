# PostGraphile × Relay Boilerplate
GraphQL driven production ready web service boilerplate used PostGraphile, Relay, Nextjs, Chakra-UI

## Concept

1. GraphQL Driven
    - All authorization and business logic written declarative in PostgreSQL (Unless you call an external API).
    - Frontend state management centered on GraphQL by Relay
2. Production Ready
3. Simple, Friendly and Customizable
    - Less scripts and simple structure

## Architecture

- Repository Manager: yarn
- Backend
    - RDB: PostgreSQL
    - Graphql Server: PostGraphile
    - Auth System: Next Auth
    - Migration Tool: migra
- Frontend
    - Client Framework: Next.js
    - GraphQL Client: Relay
    - UI Components: Chakra UI
    - Linter: Eslint
    - Formatter: Prettier
    - Testing Library: Jest
    - UI Testing Library: StoryBook
    - End-to-End Testing Library: Cypress
    - Target Production Server: AWS(S3 and ECS)
    - CI Tool: Github workflow
    - Pricing System: Stripe

## Usage (WIP)
