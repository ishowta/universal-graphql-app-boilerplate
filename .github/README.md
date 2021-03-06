# Universal GraphQL App Boilerplate (experimental)

GraphQL driven universal application boilerplate used PostgreSQL, PostGraphile, Relay , React and React Native

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

![Architecture](./architecture.png)

- Backend
  - RDB: PostgreSQL
  - Graphql Server: PostGraphile
  - Auth Service: Firebase Authentication
- Frontend
  - Client Framework: React, React Native
  - GraphQL Client: Relay
  - UI Components: React native

## Usage

1. Create `/.env.local` and fill it.
1. Setup firebase. See https://firebase.google.com/docs/web/setup and https://rnfirebase.io/auth/usage.
1. As needed: `yarn install`, `yarn setup`, `yarn start`

## Todo

- Add real world sample
- Setup production build and deploy
- Add migration tool(migra?)
- Add Tests(Jest, Cypass, Storybook, CI ...)
- Add payment system(Stripe?)
