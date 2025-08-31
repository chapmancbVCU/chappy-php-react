



/**
 * Formats id based on value for name attribute.
 * @param {string} name Name attribute for form element.
 * @returns {string} The value for the id attribute.
 */
export function formatId(name) {
  return name.replace(/\[]/, "");
}


export function normalizeAttrs(attrs = {}) {
  const { class: klass, for: htmlFor, ...rest } = attrs;
  if (klass) rest.className = klass;
  if (htmlFor) rest.htmlFor = htmlFor;
  return rest;
}