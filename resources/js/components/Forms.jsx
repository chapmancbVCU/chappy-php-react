import { useState } from 'react';
import { getCsrf } from '@/utils/csrf';
import { Editor } from '@tinymce/tinymce-react';
import { appendErrorClass, htmlspecialchars, formatId, normalizeAttrs } from '@/utils/form';
import tinymce from '@/utils/tinyMCEBootstrap'
import contentCssUrl from 'tinymce/skins/content/default/content.min.css?url'; 
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
    errors=[]
}) => {
    const id = formatId(name);
    const divString = normalizeAttrs(divAttrs);
    inputAttrs = appendErrorClass(inputAttrs, errors, name, 'is-invalid');
    const inputString = normalizeAttrs(inputAttrs);

    return (
        <div {...divString}>
            <label className='control-label' htmlFor={id}>{label}</label>
            <input type={type} id={id} name={name} defaultValue={value} {...inputString} />
            <FieldErrors errors={errors} name={name} />
        </div>
    )
}

export const FieldErrors = ({ errors = {}, name }) => {
  const list = Array.isArray(errors?.[name])
    ? errors[name]
    : (errors?.[name] != null ? [errors[name]] : []);

  if (!list.length) return null;

  return (
    <span className="invalid-feedback d-block">
      {list.map((m, i) => (
        <div key={i}>{htmlspecialchars(m)}</div>
      ))}
    </span>
  );
};

/**
 * Rich text editor field (TinyMCE) that posts HTML via a hidden input.
 *
 * Behavior:
 * - Decodes any HTML entities in `value` before seeding the editor (so `<p>` renders as a paragraph).
 * - Uses TinyMCE as an uncontrolled editor; current HTML is mirrored into a hidden `<input name={name}>`
 *   so your PHP controller receives `$_POST[name]` as HTML.
 * - UI skin CSS is expected to be imported elsewhere; `skin:false` prevents URL fetches.
 *
 * @typedef {Object} RichTextProps
 * @property {string}  [label]                 Visible label text.
 * @property {string}  name                    Field name; also used to derive the editor `id`.
 * @property {string}  [value='']              Initial HTML (may be entity-encoded).
 * @property {Object}  [inputAttrs={}]         Optional attributes (e.g., `{ placeholder: '...' }`).
 * @property {Object}  [divAttrs={}]           Wrapper `<div>` attributes (e.g., `{ className: 'mb-3' }`).
 * @property {Record<string,string[]>|string[]} [errors=[]] Error bag used by `errorMsg(errors, name)`.
 *
 * @param {RichTextProps} props
 * @returns {JSX.Element}
 */
export const RichText = ({
    label,
    name,
    value = '',
    inputAttrs={},     
    divAttrs={},
    errors=[],
}) => {
    const id = formatId(name);
    const divString = normalizeAttrs(divAttrs);
    const placeholder = inputAttrs.placeholder || '';

    const decodeEntities = (s='') =>
        new DOMParser().parseFromString(String(s), 'text/html').documentElement.textContent || '';

    const initial = decodeEntities(value || '');
    const [html, setHtml] = useState(initial);

    return (
        <div {...divString}>
            {label && <label className="control-label" htmlFor={id}>{label}</label>}

            <Editor
                tinymce={tinymce}
                id={id}
                initialValue={decodeEntities(value)}
                onEditorChange={(value) => setHtml(value)}
                init={{
                    height: 300,
                    menubar: false,
                    branding: false,
                    placeholder,
                    skin: false,
                    content_css: contentCssUrl,  // let the iframe load this exact URL
                    content_css_cors: true,
                    entity_encoding: 'raw',
                    plugins:
                        'advlist autolink lists link image charmap preview anchor ' +
                        'searchreplace visualblocks code fullscreen insertdatetime media ' +
                        'table wordcount',
                    toolbar:
                        'undo redo | bold italic underline strikethrough backcolor | ' +
                        'outdent indent | alignleft aligncenter alignright alignjustify | ' +
                        'removeformat | code fullscreen',
                    license_key: 'gpl',
                }}
            />
            <input type="hidden" name={name} value={html} />
            <FieldErrors errors={errors} name={name} />
        </div>
    );
};

/**
 * Submit input helper.
 *
 * @typedef {Object} SubmitTagProps
 * @property {string} label             Button label/value.
 * @property {Object} [inputAttrs={}]   Extra attributes for `<input type="submit">`
 *                                      (e.g., `{ className: 'btn btn-primary', disabled: true }`).
 *
 * @param {SubmitTagProps} props
 * @returns {JSX.Element}
 */
export const SubmitTag = ({label, inputAttrs={}}) => {
    const inputString = normalizeAttrs(inputAttrs);
    return(
        <input type="submit" value={label} {...inputString}/>
    )
}

/**
 * Labeled, uncontrolled `<textarea>` with validation styling and messages.
 *
 * Behavior:
 * - Derives a stable `id` from `name` via `formatId()`.
 * - Normalizes wrapper/input attributes via `normalizeAttrs()` (e.g., `class` → `className`).
 * - Appends an error class (e.g., `is-invalid`) via `appendErrorClass()`.
 * - Renders field-specific error text from `errorMsg(errors, name)`.
 *
 * @typedef {Object} TextAreaProps
 * @property {string}  label                 Visible label text.
 * @property {string}  name                  Field name; also used to derive the `id`.
 * @property {string}  [value='']            Initial text (applied as `defaultValue`).
 * @property {Object}  [inputAttrs={}]       Extra attributes for `<textarea>`
 *                                           (e.g., `{ rows: 5, className: 'form-control' }`).
 * @property {Object}  [divAttrs={}]         Wrapper `<div>` attributes (e.g., `{ className: 'mb-3' }`).
 * @property {Record<string,string[]>|string[]} [errors=[]] Error bag.
 *
 * @param {TextAreaProps} props
 * @returns {JSX.Element}
 */
export const TextArea = ({
    label,
    name,
    value='',
    inputAttrs={},
    divAttrs={},
    errors=[]
}) => {
    const id = formatId(name);
    const divString = normalizeAttrs(divAttrs);
    inputAttrs = appendErrorClass(inputAttrs, errors, name, 'is-invalid');
    const inputString = normalizeAttrs(inputAttrs);

    return (
        <div {...divString}>
            <label className='control-label' htmlFor={id}>{label}</label>
            <textarea id={id} name={name} {...inputString} defaultValue={value}></textarea>
            <FieldErrors errors={errors} name={name} />
        </div>
    )
}

const Forms = { CSRF, Input, RichText, SubmitTag, TextArea };
export default Forms;