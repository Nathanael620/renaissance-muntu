import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/* SPA fallback (hébergements sans réécriture serveur, ex. GitHub Pages) :
   si 404.html a mémorisé le chemin d'un lien profond partagé, on restaure
   cette URL avant le premier rendu pour que le routeur client prenne le relais. */
const fallbackPath = sessionStorage.getItem('spa:fallback-path')
if (fallbackPath) {
  sessionStorage.removeItem('spa:fallback-path')
  window.history.replaceState({}, '', fallbackPath)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
