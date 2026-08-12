# amplifyapp

React app with Cognito auth, built with Vite. The backend is defined in
`amplify/` using Amplify Gen 2.

## Prerequisites

- Node.js 20.19+ or 22.12+ (Vite 8 requirement)
- AWS credentials on your machine, for a profile with permission to deploy
  CloudFormation stacks

## Setup

```sh
npm install
npm run sandbox
```

`npm run sandbox` provisions a personal cloud backend and writes
`amplify_outputs.json` at the repo root. That file is gitignored, and
`src/main.jsx` imports it directly — so **the app does not build until the
sandbox has run at least once**. Leave the sandbox running while you develop;
it redeploys on every change under `amplify/`.

To tear the sandbox down and delete its AWS resources:

```sh
npm run sandbox:delete
```

The sandbox provisions real AWS resources in your account. A Cognito user pool
has no fixed monthly charge, but delete the sandbox when you are done with it.

## Available scripts

### `npm run dev`

Runs the app in development mode on [http://localhost:3000](http://localhost:3000).
Requires `amplify_outputs.json` from a sandbox run.

### `npm test`

Runs the Vitest suite once and exits. Use `npx vitest` for watch mode. The tests
render the unwrapped `App` export, so they need neither a backend nor
`amplify_outputs.json`.

### `npm run build`

Builds the app for production into `dist` — minified, with hashed filenames.

### `npm run preview`

Serves `dist` locally so the production build can be checked before deploying.

## The backend

`amplify/auth/resource.ts` defines Cognito: email as the login attribute,
email required and auto-verified, MFA off, account recovery by email.

`amplify/backend.ts` then reaches through to the underlying CloudFormation
constructs for three settings `defineAuth` does not expose:

| Setting | Default | Set to |
|---|---|---|
| Password policy | min 8, requires lower, upper, digit and symbol | min 8, no character-class requirements |
| Refresh token validity | omitted from the template | 30 days |
| Unauthenticated identities | enabled | disabled |

## Deploying

`amplify.yml` drives Amplify Hosting: the backend phase runs
`ampx pipeline-deploy`, and the frontend phase publishes `dist`.

Connect the repository to a new Amplify app in the AWS console and Hosting
supplies `$AWS_BRANCH` and `$AWS_APP_ID` to the build automatically.

## Learn more

- [Amplify Gen 2](https://docs.amplify.aws/react/)
- [Amplify UI for React](https://ui.docs.amplify.aws/react/connected-components/authenticator)
- [Vite](https://vite.dev/guide/)
- [Vitest](https://vitest.dev/guide/)
