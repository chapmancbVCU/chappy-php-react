



/**
 * Formats id based on value for name attribute.
 * @param {string} name Name attribute for form element.
 * @returns {string} The value for the id attribute.
 */
export function formatId(name) {
  return name.replace(/\[]/, "");
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