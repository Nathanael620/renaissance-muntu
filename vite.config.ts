import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Remarque : pas de configuration supplémentaire nécessaire pour les routes
  // profondes (ex. /elimba, /transmission-muntu). Vite applique nativement le
  // fallback SPA (appType: "spa") en dev comme en preview : les chemins inconnus
  // sont servis avec index.html.
})