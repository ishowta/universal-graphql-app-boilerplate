# Universal GraphQL App Boilerplate (experimental)

GraphQL driven universal application boilerplate used React, React Native, PostgreSQL, PostGraphile, Relay and tailwindcss

:warning: **This app will probably work, but it's still experimental and can't be used in production.**

## Concept

1. GraphQL Driven
   - All authorization and business logic written declarative in PostgreSQL and connect to GraphQL
   - Frontend state management centered on GraphQL by Relay
2. Universal
   - Write once, work both Web and Mobile
3. Simple, Friendly and Customizable
   - Less scripts and simple structure

## Architecture

- Repository Manager: yarn(v1)
- Backend
  - RDB: PostgreSQL
  - Graphql Server: PostGraphile
  - Auth Service: Firebase Authentication
- Frontend
  - Client Framework: React, React Native
  - GraphQL Client: Relay
  - UI Components: React native
  - CSS Framework: tailwind
  - Linter: ESLint
  - Formatter: Prettier

## Usage

1. Create `/.env.local` and fill it.
1. Setup firebase. See https://firebase.google.com/docs/web/setup and https://rnfirebase.io/auth/usage.
1. As needed: `yarn install`, `yarn setup`, `yarn start`

## Todo
- Setup production build and deploy
- Add migration tool(migra?)
- Add Tests(Jest, Cypass, Storybook, CI ...)
- Add payment system(Stripe?)
- Refactoring
