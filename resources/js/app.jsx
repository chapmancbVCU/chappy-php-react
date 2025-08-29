import "../css/app.css"
import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home.jsx';
// If you’re using Bootstrap CSS via npm, import it here or in app.css

function getProps() {
  const el = document.getElementById('app');
  try { return el ? JSON.parse(el.dataset.props || '{}') : {}; }
  catch { return {}; }
}

const root = createRoot(document.getElementById('app'));
createRoot(document.getElementById('app')).render(<Home {...getProps()} />);
