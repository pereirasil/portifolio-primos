import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

/**
 * Global styles for the Code Primos portfolio
 * Includes CSS reset, typography, and base styles
 */

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@400;700;800;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily.primary};
    background: ${theme.gradients.background};
    color: ${theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.fontFamily.display};
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: 1.2;
    margin-bottom: ${theme.spacing.md};
  }

  h1 {
    font-size: ${theme.typography.fontSize['5xl']};
    font-weight: ${theme.typography.fontWeight.extrabold};
  }

  h2 {
    font-size: ${theme.typography.fontSize['4xl']};
  }

  h3 {
    font-size: ${theme.typography.fontSize['3xl']};
  }

  h4 {
    font-size: ${theme.typography.fontSize['2xl']};
  }

  p {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.textSecondary};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.animations.duration.fast} ${theme.animations.easing.easeInOut};
  }

  a:hover {
    color: ${theme.colors.secondary};
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeInOut};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.secondary};
  }

  /* Selection styles */
  ::selection {
    background: ${theme.colors.primary};
    color: ${theme.colors.text};
  }

  /* Focus styles for accessibility */
  *:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  /* Responsive typography */
  @media (max-width: ${theme.breakpoints.tablet}) {
    html {
      font-size: 14px;
    }

    h1 {
      font-size: ${theme.typography.fontSize['4xl']};
    }

    h2 {
      font-size: ${theme.typography.fontSize['3xl']};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    html {
      font-size: 12px;
    }

    h1 {
      font-size: ${theme.typography.fontSize['3xl']};
    }

    h2 {
      font-size: ${theme.typography.fontSize['2xl']};
    }
  }
`;

/**
 * Container component for consistent max-width and padding
 */
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.sm};
  }
`;

/**
 * Section wrapper with consistent spacing
 */
export const Section = styled.section`
  padding: ${theme.spacing['4xl']} 0;
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing['3xl']} 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing['2xl']} 0;
  }
`;

/**
 * Button base styles
 */
export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: 8px;
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.base};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.easeInOut};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left ${theme.animations.duration.slow} ${theme.animations.easing.easeInOut};
  }

  &:hover:before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.neon};
  }

  &:active {
    transform: translateY(0);
  }
`;

/**
 * Primary button variant
 */
export const PrimaryButton = styled(Button)`
  background: ${theme.gradients.primary};
  color: ${theme.colors.text};
  border: 2px solid transparent;

  &:hover {
    background: ${theme.gradients.secondary};
  }
`;

/**
 * Secondary button variant
 */
export const SecondaryButton = styled(Button)`
  background: transparent;
  color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.primary};

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.text};
  }
`;
