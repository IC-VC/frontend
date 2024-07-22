import { RouterProvider } from 'react-router-dom'
import { router } from './components/Router'
import SessionProvider from './providers/SessionProvider'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { enLocalisation } from './locales/en'
import BackendProvider from './providers/BackendProvider'
import ConfigProvider from './providers/ConfigProvider'
import { useMemo } from 'react'
import MobileNotAvailable from './screens/MobileNotAvailable'

import './global.css'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { ...enLocalisation } },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
})

declare module '@mui/joy/styles' {
  interface Palette {
    border: {
      primary: string
    }
  }
}

const theme = extendTheme({
  fontFamily: {
    display: 'Gilroy-Medium',
    body: 'Gilroy-Regular',
  },
  colorSchemes: {
    light: {
      palette: {
        border: {
          primary: '#E2E8F0',
        },
        primary: {
          50: 'rgba(0,0,0,0.05)',
          100: 'rgba(0,0,0,0.1)',
          200: 'rgba(0,0,0,0.2)',
          300: 'rgba(0,0,0,0.3)',
          400: 'rgba(0,0,0,0.4)',
          500: 'rgba(0,0,0,1)',
          600: 'rgba(0,0,0,1)',
          700: 'rgba(0,0,0,1)',
          800: 'rgba(0,0,0,1)',
          900: 'rgba(0,0,0,1)',
        },
      },
    },
  },
})

function App() {
  const isMob = useMemo(() => {
    return window.innerWidth <= 800
  }, [])

  if (isMob) return <MobileNotAvailable />

  return (
    <CssVarsProvider theme={theme}>
      <SessionProvider>
        <BackendProvider>
          <ConfigProvider>
            <RouterProvider router={router} />
          </ConfigProvider>
        </BackendProvider>
      </SessionProvider>
    </CssVarsProvider>
  )
}

export default App
