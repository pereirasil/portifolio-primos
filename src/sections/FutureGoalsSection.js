import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Section } from '../styles/GlobalStyles';
import { theme } from '../styles/theme';

/**
 * Future goals section component with locked missions
 * Shows future aspirations in a game-like format
 */
const GoalsContainer = styled(Section)`
  background: ${theme.colors.surface};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: ${theme.spacing['4xl']};
  font-size: clamp(2rem, 5vw, 3rem);
  background: ${theme.gradients.secondary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const GoalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1000px;
  margin: 0 auto;
`;

const GoalCard = styled(motion.div)`
  background: ${theme.colors.background};
  border-radius: 16px;
  padding: ${theme.spacing.xl};
  border: 2px solid ${theme.colors.primary};
  position: relative;
  text-align: center;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.easeInOut};
  opacity: 0.7;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%);
    border-radius: 16px;
    opacity: 0;
    transition: opacity ${theme.animations.duration.normal} ${theme.animations.easing.easeInOut};
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
    opacity: 1;

    &::before {
      opacity: 1;
    }
  }
`;

const LockIcon = styled.div`
  font-size: 2rem;
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.lg};
  opacity: 0.5;
  font-weight: ${theme.typography.fontWeight.bold};
`;

const GoalTitle = styled.h3`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.lg};
  opacity: 0.8;
`;

const GoalDescription = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.sm};
`;

const UnlockLevel = styled.div`
  background: ${theme.colors.primary};
  color: ${theme.colors.text};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 20px;
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  display: inline-block;
  opacity: 0.6;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${theme.colors.surface};
  border-radius: 2px;
  margin-top: ${theme.spacing.md};
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${theme.gradients.primary};
  border-radius: 2px;
  width: ${props => props.progress}%;
  transition: width ${theme.animations.duration.slow} ${theme.animations.easing.easeInOut};
`;

const SecretMission = styled(motion.div)`
  background: ${theme.colors.background};
  border: 2px dashed ${theme.colors.warning};
  border-radius: 16px;
  padding: ${theme.spacing.xl};
  text-align: center;
  margin-top: ${theme.spacing['2xl']};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.1), transparent);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

const SecretTitle = styled.h3`
  color: ${theme.colors.warning};
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.xl};
`;

const SecretDescription = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  font-size: ${theme.typography.fontSize.sm};
`;

const FutureGoalsSection = () => {
  const goalsData = [
    {
      id: 1,
      title: 'Criar um Jogo Completo',
      description: 'Desenvolver um jogo com gráficos, sons e uma história envolvente para outros jovens.',
      icon: 'GAME',
      unlockLevel: 'Nível 10',
      progress: 0,
    },
    {
      id: 2,
      title: 'Fazer um App Mobile',
      description: 'Criar um aplicativo para celular que ajude estudantes a aprender programação.',
      icon: 'MOBILE',
      unlockLevel: 'Nível 12',
      progress: 0,
    },
    {
      id: 3,
      title: 'Publicar Site na Internet',
      description: 'Colocar nosso portfólio online para o mundo inteiro ver nossos projetos.',
      icon: 'WEB',
      unlockLevel: 'Nível 8',
      progress: 20,
    },
    {
      id: 4,
      title: 'Aprender Inteligência Artificial',
      description: 'Explorar o mundo da IA e criar projetos que usem machine learning.',
      icon: 'AI',
      unlockLevel: 'Nível 15',
      progress: 0,
    },
    {
      id: 5,
      title: 'Participar de Hackathons',
      description: 'Competir em eventos de programação e conhecer outros desenvolvedores.',
      icon: 'TROPHY',
      unlockLevel: 'Nível 9',
      progress: 10,
    },
    {
      id: 6,
      title: 'Ensinar Programação',
      description: 'Compartilhar nosso conhecimento com outros jovens interessados em programar.',
      icon: 'TEACH',
      unlockLevel: 'Nível 11',
      progress: 0,
    },
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <GoalsContainer>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Metas Futuras
        </SectionTitle>

        <GoalsGrid>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {goalsData.map((goal) => (
              <GoalCard
                key={goal.id}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
              >
                <LockIcon>{goal.icon}</LockIcon>
                <GoalTitle>{goal.title}</GoalTitle>
                <GoalDescription>{goal.description}</GoalDescription>
                <UnlockLevel>Desbloqueia em: {goal.unlockLevel}</UnlockLevel>
                <ProgressBar>
                  <ProgressFill progress={goal.progress} />
                </ProgressBar>
              </GoalCard>
            ))}
          </motion.div>
        </GoalsGrid>

        <SecretMission
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <SecretTitle>MISSÃO SECRETA DESBLOQUEADA!</SecretTitle>
          <SecretDescription>
            Descobrimos uma missão especial: criar um projeto que ajude a comunidade! 
            Esta missão só aparece para programadores que estão realmente comprometidos 
            em fazer a diferença no mundo da tecnologia.
          </SecretDescription>
        </SecretMission>
      </Container>
    </GoalsContainer>
  );
};

export default FutureGoalsSection;
