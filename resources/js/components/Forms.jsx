import { getCsrf } from '@/utils/csrf';
/**
 * Generates hidden component for csrf token.
 * @param {string} name The name for the csrf token. 
 * @returns {HTMLInputElement} Input element of type hidden containing csrf token.
 */
export function CSRF({ name = 'csrf_token' } = {}) {
  return <input type="hidden" name={name} value={getCsrf()} />;
}


export function input(
  type,
  label,
  name,
  value = '',
  inputAttrs,
  divAttrs,
  errors = []
) {
  // console.log(`Type: ${type}`)
  // console.log(`Label: ${label}`)
  // console.log(`Name: ${name}`)
  // console.log(`Value: ${value}`)
  // console.log(`inputAttrs: ${inputAttrs.class}`)
  // console.log(`divAttrs: ${divAttrs.class}`)
  // console.log(`Errors: ${errors}`)

  // const id = formatId(name);
  // console.log(`ID: ${id}`)
}