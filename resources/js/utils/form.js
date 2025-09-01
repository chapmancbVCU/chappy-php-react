
export function appendErrorClass(inputAttrs, errors, name, cssClass) {
  console.log(inputAttrs);
  console.log(errors)

}

export function errorMsg(errors, name) {
  // console.log(errors[name]);
  // console.log(`Error field: ${errors.field}`)
  // console.log(`Error msg: ${errors.message}`)

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