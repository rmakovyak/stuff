import config from './config';

/**
 * Get the user authentication status
 */
export function checkAuth(immediate, callback) {
    window.gapi.auth.authorize({
        'client_id': config.clientId,
        'scope': config.scope,
        'immediate': immediate,
        'ux_mode': 'redirect'
    }, callback);
}
