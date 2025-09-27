import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e6fffa' },
          100: { value: '#b2f5ea' },
          500: { value: '#38b2ac' },
          600: { value: '#319795' },
          700: { value: '#2c7a7b' },
        },
      },
    },
  },
});
