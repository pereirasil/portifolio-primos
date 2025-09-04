import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Section, PrimaryButton } from '../styles/GlobalStyles';
import { theme } from '../styles/theme';

/**
 * Hero section component with main title, subtitle and avatars
 * Features animated entrance and gamer-style design
 */
const HeroContainer = styled(Section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding-top: 100px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255, 107, 107, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: ${theme.typography.fontWeight.bold};
  background: ${theme.gradients.rainbow};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xl};
  font-weight: ${theme.typography.fontWeight.medium};
  line-height: 1.5;
  background: ${theme.gradients.secondary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const AvatarContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const Avatar = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.surface};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  border: 4px solid ${theme.colors.surface};

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    background: ${theme.gradients.rainbow};
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    transition: opacity ${theme.animations.duration.normal} ${theme.animations.easing.easeInOut};
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
`;

const AvatarName = styled(motion.p)`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin-top: ${theme.spacing.sm};
`;

const CTAButton = styled(PrimaryButton)`
  font-size: ${theme.typography.fontSize.base};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: 25px;
  background: ${theme.gradients.rainbow};
  color: ${theme.colors.surface};
  font-weight: ${theme.typography.fontWeight.bold};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  color: ${theme.colors.primary};
  opacity: 0.3;

  &:nth-child(1) {
    top: 20%;
    left: 10%;
  }

  &:nth-child(2) {
    top: 30%;
    right: 15%;
  }

  &:nth-child(3) {
    bottom: 30%;
    left: 20%;
  }

  &:nth-child(4) {
    bottom: 20%;
    right: 10%;
  }
`;

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <HeroContainer>
      <FloatingElements>
        <FloatingIcon variants={floatingVariants} animate="animate">DEV</FloatingIcon>
        <FloatingIcon variants={floatingVariants} animate="animate">CODE</FloatingIcon>
        <FloatingIcon variants={floatingVariants} animate="animate">GAME</FloatingIcon>
        <FloatingIcon variants={floatingVariants} animate="animate">TECH</FloatingIcon>
      </FloatingElements>

      <Container>
        <HeroContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <MainTitle variants={itemVariants}>
              Jonas & Julya
            </MainTitle>

            <Subtitle variants={itemVariants}>
              Dois primos que amam programar!
            </Subtitle>

            <AvatarContainer variants={itemVariants}>
              <motion.div>
                <Avatar
                  variants={avatarVariants}
                  whileHover="hover"
                >
                  J
                </Avatar>
                <AvatarName>Jonas (12)</AvatarName>
              </motion.div>

              <motion.div>
                <Avatar
                  variants={avatarVariants}
                  whileHover="hover"
                >
                  J
                </Avatar>
                <AvatarName>Julya (13)</AvatarName>
              </motion.div>
            </AvatarContainer>

            <motion.div variants={itemVariants}>
              <CTAButton
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Ver Nossos Projetos
              </CTAButton>
            </motion.div>
          </motion.div>
        </HeroContent>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;
