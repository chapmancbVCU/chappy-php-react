import React from "react";

function getCsrf() {
   return document.getElementById('app')?.getAttribute('data-csrf') || '';
}
export default function Index({ user, action ,myInput}) {
  const csrf = getCsrf();
  return (
    <main>
      <form method="post" action={action}>
        {/* Pick the right name for your framework; keep both temporarily if unsure */}
        <input type="hidden" name="csrf_token" value={csrf} />
        {/* <input type="hidden" name="_token" value={csrf} /> */}

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" name="myInput" defaultValue={myInput ?? ''} />
        </div>

        <button className="btn btn-primary" type="submit">Save</button>
      </form>

      <h1>Hello, {user?.name ?? 'Guest'} 👋{myInput}</h1>
      <p>This view is powered by React + Vite.</p>
    </main>
  );
}
