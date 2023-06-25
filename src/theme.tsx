import { ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { grey } from '@mui/material/colors'
import {
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
  alpha,
  createTheme,
  lighten,
} from '@mui/material/styles'
import { Roboto } from 'next/font/google'
import useColorScheme from './hooks/useColorScheme'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

const options: ThemeOptions = {
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          width: '100%',
          height: '100%',
        },
        '#__next': {
          position: 'relative',
          width: '100%',
          height: '100%',
        },
        '::-webkit-scrollbar': {
          width: 4,
          height: 4,
          backgroundColor: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.action.disabled,
          borderRadius: 2,
        },
      }),
    },
    MuiAppBar: {
      defaultProps: {
        position: 'relative',
        elevation: 0,
        color: 'inherit',
      },
      styleOverrides: {
        colorDefault: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
        }),
        colorInherit: {
          backgroundColor: 'inherit',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
          textTransform: 'none',
        },
        sizeMedium: {
          lineHeight: '24px',
        },
        textSizeMedium: {
          padding: '8px 12px',
        },
        containedSizeMedium: {
          padding: '8px 24px',
        },
        outlinedSizeMedium: {
          padding: '7px 23px',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: lighten(
            theme.palette.background.paper,
            theme.palette.mode === 'light' ? 0.48 : 0.05
          ),
          borderRadius: theme.shape.borderRadius * 3,
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 6,
        }),
        paperWidthXs: {
          maxWidth: 360,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3, 3, 2),
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2, 3),
        }),
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(1, 3, 2),
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          minWidth: '112px !important',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(8),
          [theme.breakpoints.up('sm')]: {
            minHeight: 40,
          },
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...(theme.palette.mode === 'dark' && {
            '&.Mui-selected': {
              backgroundColor: theme.palette.action.selected,
              '&:hover': {
                backgroundColor: alpha(
                  theme.palette.common.white,
                  theme.palette.action.activatedOpacity
                ),
              },
            },
          }),
        }),
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 48,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: 56,
        },
      },
    },
  },
}

const theme = createTheme({
  ...options,
  palette: {
    mode: 'light',
    background: {
      default: grey[300],
      paper: grey[300],
    },
  },
})

export default theme

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a1c1e',
      paper: '#1a1c1e',
    },
  },
  ...options,
})

interface ThemeProviderProps {
  children?: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { mode } = useColorScheme()

  return (
    <MuiThemeProvider theme={mode === 'dark' ? darkTheme : theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
