import { defineAuth } from '@aws-amplify/backend';

/**
 * Cognito auth resource.
 *
 * Reproduces the previous backend's Cognito configuration:
 *  - email is the sign-up and login attribute
 *  - email is a required, auto-verified attribute
 *  - multi-factor authentication (MFA) is off
 *  - no user pool groups, no social providers, no custom attributes
 *
 * Password policy, refresh token validity and identity pool guest access have
 * no options here; they are set in amplify/backend.ts through the underlying
 * CloudFormation constructs.
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    email: {
      required: true,
      mutable: true,
    },
  },
  multifactor: {
    mode: 'OFF',
  },
  accountRecovery: 'EMAIL_ONLY',
});
