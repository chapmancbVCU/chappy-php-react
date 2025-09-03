import { useState } from 'react';
import { getCsrf } from '@/utils/csrf';
import { Editor } from '@tinymce/tinymce-react';
import { appendErrorClass, htmlspecialchars, formatId, normalizeAttrs } from '@/utils/form';
import tinymce from '@/utils/tinyMCEBootstrap'
import contentCssUrl from 'tinymce/skins/content/default/content.min.css?url'; 

/**
 * Returns Button component with text set.
 * @property {string} label The contents of the button's label.
 * @property {object} inputAttrs The values used to set the class and other 
 * attributes of the input string.  The default value is an empty object.
 * @param {*} param0 
 * @returns {HTMLButtonElement} A button element.
 */
export const Button = ({label, inputAttrs={}}) => {
    const inputString = normalizeAttrs(inputAttrs);
    return <Button type="button" {...inputString}>{label}</Button>;
}

/**
 * Supports ability to create a styled button and styled surrounding div 
 * block.  Supports ability to have functions for event handlers".
 * @property {string} label The contents of the button's label.
 * @property {object} inputAttrs The values used to set the class and other 
 * attributes of the input string.  The default value is an empty object.
 * @property {object} outputAttrs The values used to set the class and other 
 * attributes of the surrounding div.  The default value is an empty object.
 * @param {*} param0 
 * @returns 
 */
export const ButtonBlock = ({label, inputAttrs, divAttrs}) => {
    const divString = normalizeAttrs(divAttrs);
    return (
        <div {...divString}>
            <Button label={label} inputAttrs={inputAttrs} />
        </div>
    )
}

/**
 * Generates hidden component for csrf token.
 * @param {string} name The name for the csrf token. 
 * @returns {HTMLInputElement} Input element of type hidden containing csrf token.
 */
export const CSRF = ({ name = 'csrf_token' } = {}) => {
  return <input type="hidden" name={name} value={getCsrf()} />;
}

/**
 * Creates an error bag containing all existing errors.
 * @property {object} errors Object containing errors.
 * @param {InputProps} param0 
 * @returns {HTMLDivElement} The error bag.
 */
export const DisplayErrors = ({errors}) => {
    const hasErrors = (errors.length !== 0) ? 'has-errors' : '';
    let list = Object.values(errors).flat(Infinity);

    return (
        <div className='form-errors'>
            <ul className={`bg-light ${hasErrors}`}>
            {list.map((field, index) => (
                <ul key={index} className='text-danger'>
                    {list[index]}
                </ul>
            ))}
            </ul>

        </div>
    )
}

/**
 * Renders an error message for a particular form field.
 * @property {object} errors The error object.
 * @property {string} name Used to search errors object for key/form field.
 * @param {InputProps} param0 
 * @returns {HTMLSpanElement} The error message for a particular field.
 */
const FieldErrors = ({ errors = {}, name }) => {
    const list = Array.isArray(errors?.[name])
        ? errors[name]
        : (errors?.[name] != null ? [errors[name]] : []);

    if (!list.length) return null;

    return (
        <span className="invalid-feedback d-block">
            {list.map((message, index) => (
                <div key={index}>{htmlspecialchars(message)}</div>
            ))}
        </span>
    );
};

/**
 * Assists in the development of forms input blocks in forms.  It accepts 
 * parameters for setting attribute tags in the form section.  Not to be 
 * used for inputs of type "Submit"  For submit inputs use the submitBlock 
 * or submitTag functions.
 *
 * @typedef {Object} InputProps
 * @property {'color'|'date'|'date-local'|'email'|'file'|'month'|'number'|'password'|'range'|'search'|'tel'|'text'|'time'|'url'|'week'} [type='text']
 * The input type we want to generate.
 * @property {string} label Sets the label for this input.
 * @property {string} name Sets the value for the name, for, and id attributes 
 * for this input.
 * @property {string|number} value The value we want to set.  We can use this to set 
 * the value of the value attribute during form validation.  Default value 
 * is the empty string.  It can be set with values during form validation 
 * and forms used for editing records.
 * @property {object} inputAttrs The values used to set the class and other 
 * attributes of the input string.  The default value is an empty object.
 * @property {object} outputAttrs The values used to set the class and other 
 * attributes of the surrounding div.  The default value is an empty object.
 * @property {Record<string, string[]>|string[]} [errors=[]]The errors object.  
 * Default value is an empty object.
 * @param {InputProps} props
 * @returns {HTMLDListElement} Labeled input with optional validation message.
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
 * @property {string} label Sets the label for this input.
 * @property {string} name Sets the value for the name, for, and id attributes 
 * for this input.
 * @property {string} value The value we want to set.  We can use this to set 
 * the value of the value attribute during form validation.  Default value 
 * is the empty string.  It can be set with values during form validation 
 * and forms used for editing records.
 * @property {object} inputAttrs The values used to set the class and other 
 * attributes of the input string.  The default value is an empty object.
 * @property {object} outputAttrs The values used to set the class and other 
 * attributes of the surrounding div.  The default value is an empty object.
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
 * Create a input element of type submit.
 *
 * @typedef {Object} SubmitTagProps
 * @property {string} label Sets the value of the text describing the 
 * button.
 * @property {object} inputAttrs The values used to set the class and other 
 * attributes of the input string.  The default value is an empty object.
 * @param {SubmitTagProps} props
 * @returns {HTMLInputElement} An input element of type submit.
 */
export const SubmitTag = ({label, inputAttrs={}}) => {
    const inputString = normalizeAttrs(inputAttrs);
    return(
        <input type="submit" value={label} {...inputString}/>
    )
}

/**
 * Assists in the development of textarea in forms.  It accepts parameters 
 * for setting  attribute tags in the form section.
 *
 * @typedef {Object} TextAreaProps
 * @property {string} label Sets the label for this input.
 * @property {string}  name Sets the value for the name, for, and id attributes 
 * for this input.
 * @property {string} value The value we want to set.  We can use this to set 
 * the value of the value attribute during form validation.  Default value 
 * is the empty string.  It can be set with values during form validation 
 * and forms used for editing records.
 * @property {object} inputAttrs The values used to set the class and other 
 * attributes of the input string.  The default value is an empty object.
 * @property {object} outputAttrs The values used to set the class and other 
 * attributes of the surrounding div.  The default value is an empty object.
 * @property {Record<string,string[]>|string[]} [errors=[]] The errors object.  
 * Default value is an empty object.
 *
 * @param {TextAreaProps} props
 * @returns {HTMLTextAreaElement} A surrounding div and the textarea element.
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

const Forms = { 
    Button,
    CSRF, 
    DisplayErrors, 
    Input, 
    RichText, 
    SubmitTag, 
    TextArea 
};
export default Forms;