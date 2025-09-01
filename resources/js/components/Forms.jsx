import { getCsrf } from '@/utils/csrf';
import { appendErrorClass, errorMsg, formatId, normalizeAttrs } from '@/utils/form';
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
    const id = formatId(name);
    const divString = normalizeAttrs(divAttrs);
    let errorMessages = errorMsg(errors, name);
    inputAttrs = appendErrorClass(inputAttrs, errors, name, 'is-invalid');
    const inputString = normalizeAttrs(inputAttrs);

    return (
        <div {...divString}>
            <label className='control-label' htmlFor={id}>{label}</label>
            <input type={type} id={id} name={name} defaultValue={value} {...inputString} />
            <span className='invalid-feedback'>{errorMessages}</span>
        </div>
    )
}

const Forms = { CSRF, Input };
export default Forms;