import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { AppProviders } from './AppProviders';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container is missing. Ensure index.html has a div with id="root".');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
