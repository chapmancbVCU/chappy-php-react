import React from 'react';

export default function Home({ user = {} }) {
  const name = user.name ?? 'Guest';
  return (
    <main>
      <h1>Hello, {name} 👋</h1>
      <p>This view is powered by React + Vite.</p>
    </main>
  );
}
