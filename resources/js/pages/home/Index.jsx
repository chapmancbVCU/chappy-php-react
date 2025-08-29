import React from 'react';

export default function Index({ user }) {
//   const name = user.name ?? 'Guest';
  return (
    <main>
      <h1>Hello, {user.name} 👋</h1>
      <p>This view is powered by React + Vite.</p>
    </main>
  );
}
