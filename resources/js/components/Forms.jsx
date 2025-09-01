import { useState } from 'react';
import { getCsrf } from '@/utils/csrf';
import { Editor } from '@tinymce/tinymce-react';
import { appendErrorClass, errorMsg, formatId, normalizeAttrs } from '@/utils/form';
import tinymce from 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';

// plugins you use:
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';

import 'tinymce/skins/ui/oxide/skin.min.css';
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
    errors = []
}) => {
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

export const RichText = ({
  label,
  name,
  value = '',
  inputAttrs = {},     // e.g. { className: '...', placeholder: '...' }
  divAttrs = {},       // e.g. { className: 'form-group mb-3' }
  errors = [],
}) => {
  const id = formatId(name);
  const divString = normalizeAttrs(divAttrs);
  const placeholder = inputAttrs.placeholder || '';
  const [html, setHtml] = useState(String(value || ''));

  const decodeEntities = (s='') =>
  new DOMParser().parseFromString(String(s), 'text/html').documentElement.textContent || '';

  return (
    <div {...divString}>
        {label && <label className="control-label" htmlFor={id}>{label}</label>}

        <Editor
            tinymce={tinymce}
            id={id}
            initialValue={decodeEntities(html)}
            onEditorChange={(content) => setHtml(content)}
            init={{
            height: 300,
            menubar: false,
            branding: false,
            placeholder,
            skin: false,                // we imported skin.min.css into the page
                content_css: contentCssUrl, 
            plugins:
                'advlist autolink lists link image charmap preview anchor ' +
                'searchreplace visualblocks code fullscreen insertdatetime media ' +
                'table wordcount',
            toolbar:
                'undo redo | bold italic underline strikethrough backcolor | ' +
                'outdent indent | alignleft aligncenter alignright alignjustify | ' +
                'removeformat',
            license_key: 'gpl',
            }}
            // If you use Tiny Cloud: add apiKey="no-api-key" or your real key
            // If self-hosting TinyMCE: import 'tinymce/tinymce', theme, icons, plugins in your app entry
        />

        {/* This is what your PHP action will read: $_POST['description'] */}
        <input type="hidden" name={name} value={html} />

        {/* inline error(s) */}
        <span className="invalid-feedback d-block">{errorMsg(errors, name)}</span>
    </div>
  );
};

export const SubmitTag = ({label, inputAttrs = []}) => {
    const inputString = normalizeAttrs(inputAttrs);
    return(
        <input type="submit" value={label} {...inputString}/>
    )
}

export const TextArea = ({
    label,
    name,
    value='',
    inputAttrs={},
    divAttrs={},
    errors = []
}) => {
    const id = formatId(name);
    const divString = normalizeAttrs(divAttrs);
    let errorMessages = errorMsg(errors, name);
    inputAttrs = appendErrorClass(inputAttrs, errors, name, 'is-invalid');
    const inputString = normalizeAttrs(inputAttrs);

    return (
        <div {...divString}>
            <label className='control-label' htmlFor={id}>{label}</label>
            <textarea id={id} name={name} {...inputString} defaultValue={value}></textarea>
            <span className='invalid-feedback'>{errorMessages}</span>
        </div>
    )
}
const Forms = { CSRF, Input, RichText, SubmitTag, TextArea };
export default Forms;