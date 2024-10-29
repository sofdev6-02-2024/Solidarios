import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080/',
  realm: 'solidarios-realm',
  clientId: 'next-client'
};

const keycloak = new Keycloak(keycloakConfig);

keycloak.onTokenExpired = () => {
  keycloak.updateToken(30).catch(() => {
    console.log('Token refresh failed');
    keycloak.login();
  });
};


export const loginWithKeycloak = () => {
  keycloak.login();
};

export const logoutWithKeycloak = () => {
  keycloak.logout({
    redirectUri: 'http://localhost:3000',
  });
};

export default keycloak;