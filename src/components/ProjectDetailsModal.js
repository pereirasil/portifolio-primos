import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

/**
 * Project Details Modal component
 * Shows detailed information about a specific project
 */
const ProjectDetailsContainer = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: 20px;
  padding: ${theme.spacing['2xl']};
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  border: 3px solid ${theme.colors.primary};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ProjectHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${theme.colors.neon};
`;

const ProjectIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${theme.spacing.md};
  background: ${theme.gradients.rainbow};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProjectTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProjectStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${props => 
    props.status === 'completed' ? theme.gradients.secondary :
    props.status === 'upcoming' ? theme.colors.warning :
    theme.colors.error
  };
  color: ${theme.colors.surface};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 20px;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.md};
`;

const ProjectDescription = styled.p`
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.lg};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.xl};
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const DetailCard = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing.lg};
  border-radius: 12px;
  border: 2px solid ${theme.colors.neon};
  text-align: center;
`;

const DetailTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.base};
  margin-bottom: ${theme.spacing.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
`;

const DetailValue = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const TechStack = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const TechTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: ${theme.spacing.md};
  text-align: center;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  justify-content: center;
`;

const TechTag = styled.span`
  background: ${theme.gradients.primary};
  color: ${theme.colors.surface};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 15px;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const ProjectStory = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing.lg};
  border-radius: 12px;
  border-left: 4px solid ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xl};
`;

const StoryTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: ${theme.spacing.md};
`;

const StoryText = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  font-size: ${theme.typography.fontSize.base};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: 25px;
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.bold};
  cursor: pointer;
  transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeInOut};
  border: 2px solid transparent;

  ${props => props.variant === 'primary' && `
    background: ${theme.gradients.rainbow};
    color: ${theme.colors.surface};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
  `}

  ${props => props.variant === 'secondary' && `
    background: transparent;
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    
    &:hover {
      background: ${theme.colors.primary};
      color: ${theme.colors.surface};
    }
  `}
`;

const ProjectDetailsModal = ({ project, onClose }) => {
  if (!project) return null;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Missão Cumprida!';
      case 'upcoming': return 'Próxima Missão';
      case 'locked': return 'Missão Bloqueada';
      default: return 'Em Andamento';
    }
  };

  const getProjectIcon = (title) => {
    if (title.includes('Site')) return '🌐';
    if (title.includes('Jogo') || title.includes('Joguinho')) return '🎮';
    if (title.includes('App')) return '📱';
    if (title.includes('Robô')) return '🤖';
    if (title.includes('Arduino')) return '⚡';
    return '💻';
  };

  const getProjectStory = (title) => {
    switch (title) {
      case 'Nosso Primeiro Site':
        return 'Foi emocionante criar nosso primeiro site com React! Aprendemos sobre componentes, hooks e como fazer sites interativos. Foi incrível ver nossas ideias ganhando vida na tela do computador!';
      case 'Joguinho de Adivinhar Número':
        return 'Este foi nosso primeiro jogo com React! Aprendemos sobre lógica de programação, hooks do React e animações com Framer Motion. Foi muito divertido testar e ver funcionando!';
      case 'Robô com Arduino':
        return 'Nossa próxima aventura será criar um robô! Vamos aprender sobre eletrônica e programação física. Estamos muito animados para ver o robô se mexer!';
      case 'App Mobile':
        return 'Queremos criar um aplicativo para celular que ajude outros estudantes a aprender programação de forma divertida e fácil!';
      case 'Site na Internet':
        return 'Nosso sonho é colocar nosso portfólio na internet para o mundo inteiro ver nossos projetos incríveis!';
      case 'Jogo Completo':
        return 'Sonhamos em criar um jogo completo com gráficos, sons e uma história envolvente para outros jovens se divertirem!';
      default:
        return 'Este é um dos nossos projetos especiais! Cada projeto nos ensina algo novo sobre programação.';
    }
  };

  return (
    <ProjectDetailsContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <ProjectHeader>
        <ProjectIcon>{getProjectIcon(project.title)}</ProjectIcon>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectStatus status={project.status}>
          {getStatusText(project.status)}
        </ProjectStatus>
      </ProjectHeader>

      <ProjectDescription>{project.description}</ProjectDescription>

      <DetailsGrid>
        <DetailCard>
          <DetailTitle>Status</DetailTitle>
          <DetailValue>{getStatusText(project.status)}</DetailValue>
        </DetailCard>
        <DetailCard>
          <DetailTitle>Tecnologias</DetailTitle>
          <DetailValue>{project.tech.length} tecnologias</DetailValue>
        </DetailCard>
      </DetailsGrid>

      <TechStack>
        <TechTitle>Tecnologias Usadas</TechTitle>
        <TechTags>
          {project.tech.map((tech, index) => (
            <TechTag key={index}>{tech}</TechTag>
          ))}
        </TechTags>
      </TechStack>

      <ProjectStory>
        <StoryTitle>Nossa História</StoryTitle>
        <StoryText>{getProjectStory(project.title)}</StoryText>
      </ProjectStory>

      <ButtonContainer>
        {project.hasGame && (
          <ActionButton
            variant="primary"
            onClick={() => {
              onClose();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Jogar Agora
          </ActionButton>
        )}
        
        <ActionButton
          variant="secondary"
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Fechar
        </ActionButton>
      </ButtonContainer>
    </ProjectDetailsContainer>
  );
};

export default ProjectDetailsModal;
