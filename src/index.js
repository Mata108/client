import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const supabase = createClient(
 "https://cvvtqbcrnzrthywugsnf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2dnRxYmNybnpydGh5d3Vnc25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczOTQ1MTAsImV4cCI6MjA1Mjk3MDUxMH0.pvbCOAZn_aboJiXF2ghxY6ZIE7cO675nnsnUbExcecc"
);

root.render(
  <React.StrictMode>
     <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
