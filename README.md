# Account Users

A Vue 3 Vite app to view, edit, and delete account users.

The backend is a simplified JSON server that serves and mutates the account users data.

## Running the Project Locally

Clone the repository and navigate to the project directory.
Presuming [Node.js](https://nodejs.org/en) 18+ and [npm](https://www.npmjs.com/):


### 1. Install Dependencies

```sh
npm ci
```

### 2. Start the Backend Server

```sh
npm run server
```

This runs Fastify backend server on [http://localhost:3000](http://localhost:3000).

### 3. Start the Frontend Dev Server

After starting the backend server, open a new terminal and run the Vite dev server:

```sh
npm run dev
```

## Backend Endpoints

| Method | Endpoint / Parameter | Type     | Description                        |
|--------|----------------------|----------|------------------------------------|
| GET    | `/users`             |          | Retrieves all account users        |
|        | — `filter`           | `string` | — Filter users by all fields       |
|        | — `offset`           | `number` | — Offset for pagination            |
|        | — `limit`            | `number` | — Page size for pagination         |
| PATCH  | `/users`             | `User[]` | Updates multiple users in bulk     |
| DELETE | `/users`             | `User[]` | Deletes multiple users in bulk     |
| PATCH  | `/users/:userId`     | `User`   | Updates details of a specific user |
| DELETE | `/users/:userId`     |          | Deletes a specific user            |
| GET    | `/reset-users`       |          | Resets users to initial state      |

Vite dev server is configured to proxy requests to the backend.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).
- WebStorm / Intellij (enable `Automatic ESLint configuration` and `Run eslint --fix on save` in settings)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Project Commands

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
