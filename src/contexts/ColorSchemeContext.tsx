import { ReactNode, createContext, useCallback, useState } from 'react'
import { unstable_useEnhancedEffect } from '@mui/material/utils'

interface ColorSchemeContextState {
  mode: 'light' | 'dark'
  toggleMode: () => void
}

const initialState: ColorSchemeContextState = {
  mode: 'light',
  toggleMode: () => {},
}

const ColorSchemeContext = createContext<ColorSchemeContextState>(initialState)

export default ColorSchemeContext

interface ColorSchemeProviderProps {
  children?: ReactNode
}

export function ColorSchemeProvider({ children }: ColorSchemeProviderProps) {
  const [mode, setMode] = useState(initialState.mode)

  unstable_useEnhancedEffect(() => {
    const colorMode = window.localStorage.getItem('color-mode')

    if (colorMode === 'light' || colorMode === 'dark') {
      setMode(colorMode)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark')
    }
  }, [])

  const toggleMode = useCallback(() => {
    setMode((prevMode) => {
      const newValue = prevMode === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('color-mode', newValue)
      return newValue
    })
  }, [])

  return (
    <ColorSchemeContext.Provider
      value={{
        mode,
        toggleMode,
      }}
    >
      {children}
    </ColorSchemeContext.Provider>
  )
}
