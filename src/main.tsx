import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { DirectionProvider } from './context/direction-provider'
import { FontProvider } from './context/font-provider'
import { LanguageProvider } from './context/language-provider'
import { ThemeProvider } from './context/theme-provider'
// i18n (initializes the i18next singleton as a side effect)
import './i18n'
// Generated Routes
import { routeTree } from './routeTree.gen'
// Styles
import './styles/index.css'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider>
        <FontProvider>
          <DirectionProvider>
            <LanguageProvider>
              <RouterProvider router={router} />
            </LanguageProvider>
          </DirectionProvider>
        </FontProvider>
      </ThemeProvider>
    </StrictMode>
  )
}
