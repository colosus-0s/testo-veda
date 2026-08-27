export const THEME = {
  colors: {
    bg: {
      primary: '#0f0f11',
      surface: '#17171a',
      elevated: '#222226',
      hover: '#2c2c33',
    },
    brand: {
      primary: '#8b1528',
      primaryHover: '#a31c32',
      darkMaroon: '#5c0b1a',
      accentGold: '#d4af37',
      accentGoldLight: '#f3e5ab',
      botanicalGreen: '#2e6f40',
      botanicalLight: '#3d8b52',
    },
    text: {
      primary: '#f5f5f7',
      secondary: '#9e9ea7',
      dim: '#6b6b76',
      inverse: '#0f0f11',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.08)',
      medium: 'rgba(255, 255, 255, 0.16)',
      brand: 'rgba(139, 21, 40, 0.4)',
    },
    status: {
      success: '#2e6f40',
      warning: '#d48806',
      error: '#cf1322',
      info: '#1890ff',
    },
  },
  fonts: {
    serifDisplay: "'Cinzel', Georgia, serif",
    sansBody: "'Inter', system-ui, sans-serif",
    sansDisplay: "'Outfit', sans-serif",
  },
  radii: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  maxWidths: {
    container: '1280px',
    narrowContainer: '1024px',
    readingContainer: '768px',
  },
} as const;
