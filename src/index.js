import React from 'react';
import ReactDOM from 'react-dom/client';  // ✅ Correct import for React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from "react-router-dom";
//const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const PUBLISHABLE_KEY = 'pk_test_aG9uZXN0LWR1Y2stODAuY2xlcmsuYWNjb3VudHMuZGV2JA';

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key! Check your .env file.");
}

// ✅ Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}  >
       
       <App />
     </ClerkProvider>
    
    
    </BrowserRouter>
    
  </React.StrictMode>
);

reportWebVitals();
