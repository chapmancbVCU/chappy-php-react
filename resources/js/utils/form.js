/**
 * Appends error class to surrounding div of element.  If key is not 
 * found based on value stored in name then nothing happens.
 * @param {object} inputAttrs The attributes for the input element.
 * @param {object} errors The object containing data about errors.
 * @param {string} name The name of the field containing the error.
 * @param {string} cssClass The class to append.
 * @returns 
 */
export function appendErrorClass(inputAttrs, errors, name, cssClass) {
  if(errors[name]) {
    inputAttrs.className += " " + cssClass;
  }
  return inputAttrs;
}

/**
 * 
 * @param {object} errors The object containing data about errors.
 * @param {string} name  The name of the field used to select key in object.
 * @returns 
 */
export function errorMsg(errors, name) {
  return htmlspecialchars(errors[name]);
}

/**
 * Formats id based on value for name attribute.
 * @param {string} name Name attribute for form element.
 * @returns {string} The value for the id attribute.
 */
export function formatId(name) {
  return name.replace(/\[]/, "");
}

/**
 * HTML-escapes a string (PHP `htmlspecialchars`-style).
 *
 * Escapes `&`, `<`, `>` by default (≈ `ENT_NOQUOTES`). When `quotes` is `true`,
 * it also escapes double and single quotes (≈ `ENT_QUOTES`).
 *
 * ⚠️ Intended for **HTML text** context. For attributes/URLs, use a context-aware encoder.
 *
 * @param {string} [str=''] - The input string to escape.
 * @param {Object} [options={}] - Options.
 * @param {boolean} [options.quotes=false] - Also escape `"` and `'` when `true`.
 * @returns {string} The escaped HTML string.
 *
 * @example
 * htmlspecialchars('<p class="x">O\'Reilly & co</p>');
 * // => "&lt;p class=&quot;x&quot;&gt;O'Reilly &amp; co&lt;/p&gt;"
 *
 * @example
 * htmlspecialchars(`O'Reilly`, { quotes: true });
 * // => "O&#39;Reilly"
 */
function htmlspecialchars(str = '', { quotes = false } = {}) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;', // only if quotes=true
    "'": '&#39;',  // only if quotes=true
  };
  return String(str).replace(quotes ? /[&<>"']/g : /[&<>]/g, ch => map[ch]);
}

/**
 * Normalized attributes to be suitable for use in HTML elements.
 * @param {object} attrs The attributes to normalize.
 * @returns {any} The normalized attributes.
 */
export function normalizeAttrs(attrs = {}) {
  const { attribute: attr, for: htmlFor, ...rest } = attrs;
  if (attr) rest.className = attr;
  if (htmlFor) rest.htmlFor = htmlFor;
  return rest;
}