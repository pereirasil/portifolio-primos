/**
 * Theme configuration for Code Primos portfolio
 * Defines colors, typography, and spacing for the gamer-style design
 */

export const theme = {
  colors: {
    primary: '#FF6B6B', // Bright Red
    secondary: '#4ECDC4', // Bright Teal
    accent: '#45B7D1', // Bright Blue
    neon: '#96CEB4', // Bright Green
    background: '#FFF8E1', // Light Yellow Background
    surface: '#FFFFFF', // White surface
    text: '#2C3E50', // Dark Blue text
    textSecondary: '#7F8C8D', // Gray text
    warning: '#F39C12', // Bright Orange
    error: '#E74C3C', // Bright Red
    purple: '#9B59B6', // Bright Purple
    pink: '#E91E63', // Bright Pink
    yellow: '#F1C40F', // Bright Yellow
  },
  gradients: {
    primary: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
    secondary: 'linear-gradient(135deg, #45B7D1 0%, #96CEB4 100%)',
    background: 'linear-gradient(135deg, #FFF8E1 0%, #E8F5E8 100%)',
    rainbow: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #9B59B6, #E91E63)',
  },
  typography: {
    fontFamily: {
      primary: '"Inter", "Segoe UI", "Roboto", sans-serif',
      display: '"Orbitron", "Inter", sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    neon: '0 0 20px rgba(139, 92, 246, 0.5)',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
};
