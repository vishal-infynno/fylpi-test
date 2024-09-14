'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-outfit)',
  },
  palette: {
    primary: {
      main: '#33443C',
      light: '#ABC0B6',
      dark: '#002884',
      contrastText: '#FAFAFA',
    },
    secondary: {
      main: '#F87A53',
      light: '#FA9B7E',
      dark: '#F65B2B',
      contrastText: '#FAFAFA',
    },
  },
  cssVariables: true,
});

export default theme;
