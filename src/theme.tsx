import { grey } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme, lighten } from '@mui/material/styles'
import { Roboto } from 'next/font/google'
import type {} from '@mui/material/themeCssVarsAugmentation'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: grey[300],
          paper: grey[300],
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: '#1a1c1e',
          paper: '#1a1c1e',
        },
      },
    },
  },
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
          backgroundColor: theme.vars.palette.action.disabled,
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
          backgroundColor: theme.vars.palette.background.paper,
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
          backgroundColor: lighten(theme.colorSchemes.light.palette.background.paper, 0.48),
          borderRadius: theme.shape.borderRadius * 3,
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: lighten(theme.colorSchemes.dark.palette.background.paper, 0.05),
          },
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
          [theme.getColorSchemeSelector('dark')]: {
            '&.Mui-selected': {
              backgroundColor: theme.vars.palette.action.selected,
              '&:hover': {
                backgroundColor: `rgba(255 255 255 / ${theme.vars.palette.action.activatedOpacity})`,
              },
            },
          },
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
})

export default theme
