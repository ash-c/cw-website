import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: '#eceff8' },
          100: { value: '#d9dff2' },
          200: { value: '#bdc7e8' },
          300: { value: '#98a7db' },
          400: { value: '#5f77c7' },
          500: { value: '#1437ad' },
          600: { value: '#123098' },
          700: { value: '#0f2a83' },
          800: { value: '#0d236f' },
          900: { value: '#0a1d5a' },
          950: { value: '#081645' },
        },
        secondary: {
          50: { value: '#ebf5f7' },
          100: { value: '#d7ebef' },
          200: { value: '#b9dde4' },
          300: { value: '#91c9d4' },
          400: { value: '#54acbc' },
          500: { value: '#04859d' },
          600: { value: '#04788d' },
          700: { value: '#036476' },
          800: { value: '#035666' },
          900: { value: '#02434f' },
          950: { value: '#02353f' },
        },
        highlight: {
          50: { value: '#fff9eb' },
          100: { value: '#fff2d6' },
          200: { value: '#ffe9b8' },
          300: { value: '#ffdc8f' },
          400: { value: '#ffc952' },
          500: { value: '#ffb000' },
          600: { value: '#e09b00' },
          700: { value: '#c28600' },
          800: { value: '#a37100' },
          900: { value: '#855c00' },
          950: { value: '#664600' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
