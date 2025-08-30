let _csrf = null;

export function getCsrf() {
  if (_csrf !== null) return _csrf; // cache it
  _csrf = document.getElementById('app')?.getAttribute('data-csrf') || '';
  return _csrf;
}

export function HiddenCsrfInput({ name = 'csrf_token' } = {}) {
  return <input type="hidden" name={name} value={getCsrf()} />;
}
