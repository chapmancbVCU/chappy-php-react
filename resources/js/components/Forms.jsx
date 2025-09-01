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

/**
 * Render a labeled, uncontrolled `<input>` with validation styling and messages.
 *
 * This component:
 * - Derives a stable `id` from `name` via `formatId()`.
 * - Normalizes wrapper and input attributes (e.g., `class` → `className`) via `normalizeAttrs()`.
 * - Appends an error class (e.g., `is-invalid`) to the input via `appendErrorClass()`.
 * - Resolves and displays field-specific error text via `errorMsg()`.
 *
 * ⚠️ Note: `value` here is applied as **`defaultValue`** (uncontrolled input).
 * If you need a controlled input, pass `inputAttrs={{ value, onChange }}` instead.
 *
 * @typedef {Object} InputProps
 * @property {'text'|'email'|'password'|'number'|'tel'|'url'|'file'|'date'|'datetime-local'|'time'|'search'|'color'} [type='text']
 *   HTML input type.
 * @property {string} label
 *   Visible label text for the field.
 * @property {string} name
 *   Field name; also used to derive the `id`.
 * @property {string|number} [value='']
 *   Initial value (applied as `defaultValue`).
 * @property {Object} [inputAttrs={}]
 *   Additional props spread onto the `<input>` (e.g., `placeholder`, `className`, `required`, `min`, `max`, `step`, `onChange`).
 * @property {Object} [divAttrs={}]
 *   Props for the wrapper `<div>` (e.g., `className`, `style`).
 * @property {Record<string, string[]>|string[]} [errors=[]]
 *   Error bag or array; `errorMsg(errors, name)` should extract messages for this field.
 *
 * @param {InputProps} props
 * @returns {JSX.Element} Labeled input with optional validation message.
 *
 * @example
 * <Input
 *   label="First Name"
 *   name="fname"
 *   value={user.fname}
 *   divAttrs={{ className: 'mb-3' }}
 *   inputAttrs={{ className: 'form-control', placeholder: 'Enter first name' }}
 *   errors={errors}
 * />
 */
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