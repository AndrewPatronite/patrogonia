// noinspection JSUnusedGlobalSymbols

import { extendTheme, ThemeConfig } from '@chakra-ui/react'

export enum ColorMode {
  Dark = 'dark',
  Light = 'light',
}

const config: ThemeConfig = {
  initialColorMode: ColorMode.Dark,
  useSystemColorMode: false,
}

const darkThemePanelStyle = {
  backgroundColor: 'gray.700',
  textColor: 'gray.200',
  borderColor: 'gray.200',
  label: {
    color: 'gray.300',
  },
  span: {
    color: 'gray.200',
  },
}

const lightThemePanelStyle = {
  backgroundColor: 'gray.100',
  textColor: 'gray.700',
  borderColor: 'gray.700',
  label: {
    color: 'gray.800',
  },
  span: {
    color: 'gray.700',
  },
}

export const HeadingColor: { [key in ColorMode]: string } = {
  [ColorMode.Dark]: 'white',
  [ColorMode.Light]: 'messenger.700',
}

export const ErrorLabelColor: { [key in ColorMode]: string } = {
  [ColorMode.Dark]: 'red.300',
  [ColorMode.Light]: 'red.600',
}

const components = {
  Button: {
    variants: {
      link: ({ colorMode }: { colorMode: ColorMode }) => ({
        color: colorMode === ColorMode.Light ? 'messenger.600' : 'white',
        borderRadius: 0,
        fontWeight: 'normal',
        textDecoration: 'underline',
      }),
    },
  },
  Drawer: {
    variants: {
      noFocus: {
        parts: ['dialog, dialogContainer'],
        dialog: {
          pointerEvents: 'auto',
        },
        dialogContainer: {
          pointerEvents: 'none',
        },
      },
    },
  },
  Link: {
    baseStyle: ({ colorMode }: { colorMode: ColorMode }) => ({
      color: colorMode === ColorMode.Light ? 'messenger.600' : 'white',
      textDecoration: 'underline',
    }),
  },
  ThemedPanel: {
    baseStyle: ({
      colorMode,
      includeBorder,
    }: {
      colorMode: ColorMode
      includeBorder: boolean
    }) => ({
      ...(colorMode === ColorMode.Light
        ? lightThemePanelStyle
        : darkThemePanelStyle),
      ...(includeBorder && {
        borderRadius: '0.333rem',
        borderWidth: '2px',
      }),
    }),
  },
}

const theme = extendTheme({ components, config })

export default theme
