import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../styles/GlobalStyles';
import { theme } from '../styles/theme';

/**
 * Footer component with fun credits and social links
 * Features animated elements and gamer-style design
 */
const FooterContainer = styled.footer`
  background: ${theme.colors.background};
  padding: ${theme.spacing['3xl']} 0 ${theme.spacing.xl};
  border-top: 2px solid ${theme.colors.primary};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.05) 50%, transparent 70%);
    pointer-events: none;
  }
`;

const FooterContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
`;

const Credits = styled(motion.div)`
  margin-bottom: ${theme.spacing.xl};
`;

const MainCredits = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const CreditsText = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.6;
`;

const TioDev = styled.span`
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.fontWeight.semibold};
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeInOut};

  &:hover {
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    background: rgba(139, 92, 246, 0.1);
  }
`;

const SocialIcon = styled.span`
  font-size: 1.2rem;
`;

const Copyright = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
  margin-bottom: ${theme.spacing.md};
`;



const Footer = () => {
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


  const socialLinks = [
    { icon: 'TIKTOK', label: 'TikTok', href: 'https://www.tiktok.com/@mini_devjr?lang=pt-BR' },
  ];

  return (
    <FooterContainer>

      <Container>
        <FooterContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Credits variants={itemVariants}>
              <MainCredits>Feito com amor por Jonas (12) & Julya (13)</MainCredits>
              <CreditsText>
                Powered by <TioDev>Tio Dev</TioDev> - 15+ anos de experiência
              </CreditsText>
              <CreditsText>
                Inspirados a criar o futuro da tecnologia, um código por vez!
              </CreditsText>
            </Credits>

            <SocialLinks variants={itemVariants}>
              {socialLinks.map((link, index) => (
                <SocialLink
                  key={index}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  onClick={(e) => {
                    if (link.href === '#') {
                      e.preventDefault();
                    }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SocialIcon>{link.icon}</SocialIcon>
                  {link.label}
                </SocialLink>
              ))}
            </SocialLinks>

            <motion.div variants={itemVariants}>
              <Copyright>
                © 2024 Code Primos. Todos os direitos reservados.
              </Copyright>
            </motion.div>

          </motion.div>
        </FooterContent>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
