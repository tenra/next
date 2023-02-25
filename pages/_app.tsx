import '@/styles/globals.css'
import React from "react";
import type { AppProps } from 'next/app'
import { CurrentUserWrapper } from 'lib/CurrentUserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Layout from "components/layouts";

import { createTheme, ThemeProvider, PaletteMode, CssBaseline } from '@mui/material'
import { ThemeContext } from "@/lib/theme/ThemeContext";

const queryClient = new QueryClient()

import { darkTheme } from "@/lib/theme/dark";
import { lightTheme } from "@/lib/theme/light";

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const themeMode = React.useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
  const theme = React.useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <CurrentUserWrapper>
      <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={themeMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <Layout>
              <ToastContainer hideProgressBar theme="colored" transition={Slide} />
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ThemeContext.Provider>
      </QueryClientProvider>
    </CurrentUserWrapper>
  )
}
