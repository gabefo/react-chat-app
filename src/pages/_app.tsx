import * as React from 'react'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import Grow from '@mui/material/Grow'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { MotionConfig } from 'framer-motion'
import { ConfirmProvider } from 'material-ui-confirm'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { SnackbarProvider } from 'notistack'
import { Provider as ReduxProvider } from 'react-redux'
import createEmotionCache from '@/createEmotionCache'
import { store } from '@/lib/redux'
import theme from '@/theme'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export type MyAppProps = AppProps & {
  emotionCache?: EmotionCache
}

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, interactive-widget=resizes-content"
          />
        </Head>
        <CssVarsProvider theme={theme} defaultMode="system">
          <CssBaseline enableColorScheme />
          <ReduxProvider store={store}>
            <ConfirmProvider
              defaultOptions={{
                dialogProps: {
                  maxWidth: 'xs',
                  TransitionComponent: Grow,
                },
              }}
            >
              <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                <MotionConfig
                  transition={{
                    ease: [0.4, 0, 0.2, 1],
                    duration: 0.3,
                  }}
                >
                  <Component {...pageProps} />
                </MotionConfig>
              </SnackbarProvider>
            </ConfirmProvider>
          </ReduxProvider>
        </CssVarsProvider>
      </CacheProvider>
    </SessionProvider>
  )
}
