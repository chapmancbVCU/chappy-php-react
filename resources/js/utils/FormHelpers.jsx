let _csrf = null;

/**
 * Retrieves csrf token from data-csrf attribute.
 * @returns {string} Hidden element with csrf token as value.
 */
export function getCsrf() {
  if (_csrf !== null) return _csrf; // cache it
  _csrf = document.getElementById('app')?.getAttribute('data-csrf') || '';
  return _csrf;
}

/**
 * Generates hidden component for csrf token.
 * @param {string} name The name for the csrf token. 
 * @returns {HTMLInputElement} Input element of type hidden containing csrf token.
 */
export function CSRF({ name = 'csrf_token' } = {}) {
  return <input type="hidden" name={name} value={getCsrf()} />;
}
