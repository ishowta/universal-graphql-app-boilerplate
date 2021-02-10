# PostGraphile × Relay Boilerplate
GraphQL driven production ready web service boilerplate used PostGraphile, Relay, Nextjs, Chakra-UI

## Concept

1. GraphQL Driven
    - All authorization and business logic written declarative in PostgreSQL and connect to GraphQL.
    - Frontend state management centered on GraphQL by Relay
2. Universal
    - Write once, work Web, Mobile, Desktop
3. Production Ready
    - Secure
    - Fast
    - Scalable
    - Type safe and Test enviroment is in place
    - Battery included
4. Simple, Friendly and Customizable
    - Less scripts and simple structure

## Architecture

- Repository Manager: lerna
- Backend
    - RDB: PostgreSQL
    - Graphql Server: PostGraphile
    - Auth Service: Firebase
    - Migration Tool: migra
- Frontend
    - Client Framework: Expo
    - GraphQL Client: Relay
    - UI Components: React native for Web
    - CSS Framework: tailwind-rn
    - Linter: ESLint
    - Formatter: Prettier
    - Testing Library: Jest
    - UI Testing Library: StoryBook
    - End-to-End Testing Library: Cypress
    - Target Production Server: AWS (S3 and ECS)
    - CI Tool: Github workflow
    - Pricing System: Stripe

## Usage (WIP)
