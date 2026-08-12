import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';

const backend = defineBackend({
  auth,
});

const { cfnUserPool, cfnUserPoolClient, cfnIdentityPool } =
  backend.auth.resources.cfnResources;

// Password policy: minimum length 8, no character-class requirements.
// defineAuth exposes no password policy option, and the default requires
// lowercase, uppercase, digits and symbols, so it is replaced wholesale here.
// Policies carries no sibling keys in the generated template, so nothing else
// is lost by the assignment.
cfnUserPool.policies = {
  passwordPolicy: {
    minimumLength: 8,
    requireLowercase: false,
    requireNumbers: false,
    requireSymbols: false,
    requireUppercase: false,
  },
};

// Refresh token validity: 30 days. Left unset, the generated template omits it
// entirely, so both the value and its unit are stated explicitly.
cfnUserPoolClient.refreshTokenValidity = 30;
cfnUserPoolClient.tokenValidityUnits = {
  refreshToken: 'days',
};

// An identity pool is always created and guest access defaults to enabled, so
// unauthenticated identities are turned off explicitly.
cfnIdentityPool.allowUnauthenticatedIdentities = false;
