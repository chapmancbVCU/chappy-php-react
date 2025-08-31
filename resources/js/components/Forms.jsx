import { getCsrf } from '@/utils/csrf';
import { formatId, normalizeAttrs } from '@/utils/form';
/**
 * Generates hidden component for csrf token.
 * @param {string} name The name for the csrf token. 
 * @returns {HTMLInputElement} Input element of type hidden containing csrf token.
 */
export const CSRF = ({ name = 'csrf_token' } = {}) => {
  return <input type="hidden" name={name} value={getCsrf()} />;
}


export const Input = ({
    type='text',
    label,
    name,
    value='',
    inputAttrs={},
    divAttrs={},
    errors = []}
) => {
    // console.log(`Type: ${type}`)
    // console.log(`Label: ${label}`)
    // console.log(`Name: ${name}`)
    // console.log(`Value: ${value}`)
    // console.log(`Errors: ${errors.field}`)
    
    const id = formatId(name);
    // console.log(`ID: ${id}`)
    
    console.log(`divAttrs: ${divAttrs.class}`)
    const divString = normalizeAttrs(divAttrs);
    console.log(`divString: ${divString}`)

    console.log(`inputAttrs: ${divAttrs.class}`)
    const inputString = normalizeAttrs(inputAttrs);
    console.log(`inputString: ${inputString}`)

    return (
        <div {...divString}>
            <label className='control-label' for={id}>{label}</label>
            <input type={type} id={id} name={name} value={value} {...inputString}></input>
        </div>
    )
}

const Forms = { CSRF, Input };
export default Forms;