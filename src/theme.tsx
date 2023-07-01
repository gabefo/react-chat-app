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
          default: '#e0e2ec',
          paper: '#e0e2ec',
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
        '.emoji-button': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxSizing: 'border-box',
          WebkitTapHighlightColor: 'transparent',
          backgroundColor: 'transparent',
          outline: 0,
          border: 0,
          margin: 0,
          padding: 6,
          cursor: 'pointer',
          userSelect: 'none',
          appearance: 'none',
          overflow: 'hidden',
          borderRadius: theme.vars.shape.borderRadius,
          transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shortest,
          }),
          '&:hover': {
            backgroundColor: `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`,
          },
          '&.has-dropdown::after': {
            content: '""',
            position: 'absolute',
            bottom: -2,
            right: -2,
            border: '4px solid transparent',
            borderTopColor: theme.vars.palette.action.disabled,
            transform: 'rotate(-45deg)',
          },
        },
        '@media (hover: hover) and (pointer: fine)': {
          '*::-webkit-scrollbar': {
            width: 4,
            height: 4,
            backgroundColor: 'transparent',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
          },
          '*:hover::-webkit-scrollbar-thumb': {
            backgroundColor: theme.vars.palette.action.disabled,
          },
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
