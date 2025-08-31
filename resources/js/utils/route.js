/**
 * Route function for views that supports dot notation and array of parameters.
 * @param {string} path The controller name concatenated with the action 
 * name using dot notation.
 * @param {array} params The parameters for the action.
 * @returns {string} The URL
 */
export default function route(path, params = []) {
    const parts = path.split('.');
    const controller = parts[0];
    const action = (parts.length === 2) ? parts[1] : 'index';

    let domain = import.meta.env.VITE_APP_DOMAIN;

    if(domain.endsWith('/')) {
        domain = domain.slice(0, -1);
    }

    let url = domain + '/' + controller.replace(/\//g, "") + "/" + action.replace(/\//g, "");

    if(url.length !== 0) {
        url += '/' + params.map(encodeURIComponent).join('/');
    } 

    return url;
}