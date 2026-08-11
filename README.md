# amplifyapp

React app with Cognito auth via AWS Amplify, built with Vite.

## Setup

```sh
npm install
amplify pull   # writes src/aws-exports.js (gitignored)
```

`src/aws-exports.js` is not in version control. Without it the app cannot
configure Amplify, so run `amplify pull` before `npm run dev` or `npm run build`.

## Available scripts

### `npm run dev`

Runs the app in development mode on [http://localhost:3000](http://localhost:3000).
The page reloads on edit.

### `npm test`

Runs the Vitest suite once and exits. Use `npx vitest` for watch mode.

### `npm run build`

Builds the app for production into the `dist` folder — minified, with hashed
filenames. `amplify.yml` points Amplify Hosting at that same `dist` directory.

### `npm run preview`

Serves the contents of `dist` locally so the production build can be checked
before deploying.

## Learn more

- [Vite](https://vite.dev/guide/)
- [Vitest](https://vitest.dev/guide/)
- [Amplify UI for React](https://ui.docs.amplify.aws/react/getting-started/introduction)
- [React](https://react.dev/)
