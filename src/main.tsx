import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import "./styles/globals.css";
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster
      position='top-right' toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#333',
          fontWeight: '500',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1'
        }
      }}
      />
    </AuthProvider>
  </StrictMode>,
)
