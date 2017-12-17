interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'WvV5McoJBcBuEJ7oqvQ13OOH0Dto56pi',
  CLIENT_DOMAIN: 'tokenweb.auth0.com', // e.g., you.auth0.com
  AUDIENCE: 'http://localhost:3000',
  REDIRECT: 'http://localhost:4200/callback',
  SCOPE: 'openid profile email'
};
