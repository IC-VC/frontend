import '@nfid/identitykit/react/styles.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './components/Router'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { enLocalisation } from './locales/en'
import BackendProvider from './providers/BackendProvider'
import ConfigProvider from './providers/ConfigProvider'
import { IdentityKitProvider } from '@nfid/identitykit/react'
import {
  IdentityKitAuthType,
  InternetIdentity,
  Plug,
  OISY,
} from '@nfid/identitykit'

import './global.css'
import '@mdxeditor/editor/style.css'

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
  return (
    <CssVarsProvider theme={theme}>
      <IdentityKitProvider
        authType={IdentityKitAuthType.DELEGATION}
        signers={[Plug, OISY, InternetIdentity]}
        featuredSigner={Plug}
        signerClientOptions={{
          targets: [import.meta.env.VITE_BACKEND_CANISTER_ID],
          derivationOrigin: 'https://mnc6b-aaaaa-aaaap-qhnrq-cai.icp0.io',
        }}
      >
        <BackendProvider>
          <ConfigProvider>
            <RouterProvider router={router} />
          </ConfigProvider>
        </BackendProvider>
      </IdentityKitProvider>
    </CssVarsProvider>
  )
}

export default App
