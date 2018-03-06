import config from './config';

/**
 * Get the user authentication status
 */
export function checkAuth(immediate, reconnect, callback) {
    const provider = {
        'client_id': config.clientId,
        'scope': config.scope,
        'immediate': immediate
    }

    if (reconnect) provider['authuser'] = -1;

    window.gapi.auth.authorize(provider, callback);
}
