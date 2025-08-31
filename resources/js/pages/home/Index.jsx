import React from "react";
import { CSRF } from "@/utils/FormHelpers";

export default function Index({ user, action ,myInput }) {
  return (
    <main>
      <form method="post" action={action}>
        <CSRF />

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" name="myInput" defaultValue={myInput ?? ''} />
        </div>

        <button className="btn btn-primary" type="submit">Save</button>
      </form>

      <h1>Hello, {user.username} 👋{myInput}</h1>
      <p>This view is powered by React + Vite.</p>
    </main>
  );
}
