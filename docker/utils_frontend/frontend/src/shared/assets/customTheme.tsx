import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
      primary_1: Palette['primary'];
      primary_2: Palette['primary'];
      secondary_1: Palette['secondary'];
      secondary_2: Palette['secondary'];
      accent_1: Palette['primary'];
      accent_2: Palette['primary'];
    }
  
    interface PaletteOptions {
      primary_1?: PaletteOptions['primary'];
      primary_2?: PaletteOptions['primary'];
      secondary_1?: Palette['secondary'];
      secondary_2?: Palette['secondary'];
      accent_1?: Palette['primary'];
      accent_2?: Palette['primary'];
    }
    interface BreakpointOverrides {
      xs: false;
      sm: false;
      md: false;
      lg: false;
      xl: false;
      mobile: true;
      minitablet: true;
      tablet: true;
      laptop: true;
      desktop: true;
    }
  }

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        primary_1: true;
        primary_2: true;
        secondary_1: true;
        secondary_2: true;
        accent_1: true;
        accent_2: true;	
    }
}

const primary_1_base = "#F0F3FF";
const primary_2_base = "#211951";
const secondary_1_base = "#836FFF";
const secondary_2_base = "#E5E1E1";
const accent_1_base = "#EA4186";
const accent_2_base = "#49D5B0";

export const myTheme = createTheme({
    palette: {
      primary_1: {
        main: primary_1_base,
        light: alpha(primary_1_base, 0.5),
        dark: alpha(primary_1_base, 0.9),
        contrastText: getContrastRatio(primary_1_base, '#fff') > 4.5 ? '#fff' : '#111',
      },
      primary_2: {
        main: primary_2_base,
        light: alpha(primary_2_base, 0.5),
        dark: alpha(primary_2_base, 0.9),
        contrastText: getContrastRatio(primary_2_base, '#fff') > 4.5 ? '#fff' : '#111',
      },
      secondary_1: {
        main: secondary_1_base,
        light: alpha(secondary_1_base, 0.5),
        dark: alpha(secondary_1_base, 0.9),
        contrastText: getContrastRatio(secondary_1_base, '#fff') > 4.5 ? '#fff' : '#111',
      },
      secondary_2: {
        main: secondary_2_base,
        light: alpha(secondary_2_base, 0.5),
        dark: alpha(secondary_2_base, 0.9),
        contrastText: getContrastRatio(secondary_2_base, '#fff') > 4.5 ? '#fff' : '#111',

      },
      accent_1: {
        main: accent_1_base,
        light: alpha(accent_1_base, 0.5),
        dark: alpha(accent_1_base, 0.9),
        contrastText: getContrastRatio(accent_1_base, '#fff') > 4.5 ? '#fff' : '#111',

      },
      accent_2: {
        main: accent_2_base,
        light: alpha(accent_2_base, 0.5),
        dark: alpha(accent_2_base, 0.9),
        contrastText: getContrastRatio(accent_2_base, '#fff') > 4.5 ? '#fff' : '#111',
    },
      primary: {
        main: secondary_1_base,
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      minitablet: 750,
      tablet: 950,
      laptop: 1024,
      desktop: 1200,
    },
  },
})

