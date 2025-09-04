import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Section } from '../styles/GlobalStyles';
import { theme } from '../styles/theme';
import Modal from '../components/Modal';
import NumberGuessingGame from '../components/NumberGuessingGame';
import Calculator from '../components/Calculator';
import TicTacToe from '../components/TicTacToe';
import ProjectDetailsModal from '../components/ProjectDetailsModal';

/**
 * Projects section component with gamification
 * Shows completed and upcoming projects as missions
 */
const ProjectsContainer = styled(Section)`
  background: ${theme.colors.background};
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: ${theme.spacing['4xl']};
  font-size: clamp(2rem, 5vw, 3rem);
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: 16px;
  padding: ${theme.spacing.xl};
  border: 2px solid ${props => props.completed ? theme.colors.accent : theme.colors.primary};
  position: relative;
  overflow: hidden;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.easeInOut};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.completed ? theme.gradients.secondary : theme.gradients.primary};
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${props => props.completed ? theme.colors.neon : theme.colors.secondary};
  }
`;

const MissionStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${props => props.completed ? theme.colors.accent : theme.colors.warning};
`;

const DifficultyLevel = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.textSecondary};
`;

const MissionIcon = styled.div`
  font-size: 1.2rem;
`;

const ProjectTitle = styled.h3`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.xl};
`;

const ProjectDescription = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const TechTag = styled.span`
  background: ${theme.colors.primary};
  color: ${theme.colors.text};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: 12px;
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.semibold};
  transition: color ${theme.animations.duration.fast} ${theme.animations.easing.easeInOut};

  &:hover {
    color: ${theme.colors.secondary};
  }
`;

const LockedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  backdrop-filter: blur(4px);
`;

const LockIcon = styled.div`
  font-size: 3rem;
  color: ${theme.colors.textSecondary};
  opacity: 0.5;
`;

const ProjectsSection = () => {
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);

  const projectsData = [
    {
      id: 1,
      title: 'Calculadora',
      description: 'Criamos uma calculadora simples com HTML, CSS e JavaScript. Aprendemos a capturar eventos e realizar operações matemáticas!',
      tech: ['HTML', 'CSS', 'JavaScript'],
      status: 'completed',
      link: null,
      icon: 'DONE',
      hasGame: true,
      gameType: 'calculator',
      difficulty: '⭐',
      level: 'Nível 1',
    },
    {
      id: 2,
      title: 'Jogo da Velha',
      description: 'Desenvolvemos o clássico Jogo da Velha. Foi incrível aprender a verificar vencedores e programar a lógica de um jogo real!',
      tech: ['HTML', 'CSS', 'JavaScript'],
      status: 'completed',
      link: null,
      icon: 'DONE',
      hasGame: true,
      gameType: 'tictactoe',
      difficulty: '⭐⭐',
      level: 'Nível 2',
    },
    {
      id: 3,
      title: 'Joguinho de Adivinhar Número',
      description: 'Fizemos um jogo onde o usuário precisa adivinhar um número aleatório. Aprendemos sobre lógica de programação!',
      tech: ['React', 'JavaScript', 'Styled Components'],
      status: 'completed',
      link: null,
      icon: 'DONE',
      hasGame: true,
      gameType: 'numberguessing',
      difficulty: '⭐⭐⭐',
      level: 'Nível 3',
    },
    {
      id: 4,
      title: 'Nosso Primeiro Site',
      description: 'Criamos nosso primeiro site usando React! Foi emocionante ver nossas ideias ganhando vida na web!',
      tech: ['React', 'HTML', 'CSS', 'JavaScript'],
      status: 'completed',
      link: null,
      icon: 'DONE',
      difficulty: '⭐⭐⭐⭐',
      level: 'Nível 4',
    },
    {
      id: 5,
      title: 'Robô com Arduino',
      description: 'Nossa próxima missão será montar um robô usando Arduino e programá-lo para seguir comandos básicos.',
      tech: ['Arduino', 'C++', 'Eletrônica'],
      status: 'upcoming',
      link: null,
      icon: 'LOCK',
      difficulty: '⭐⭐⭐⭐⭐',
      level: 'Nível 5',
    },
    {
      id: 6,
      title: 'App Mobile',
      description: 'Queremos criar um aplicativo para celular que ajude outros estudantes a aprender programação de forma divertida.',
      tech: ['React Native', 'JavaScript'],
      status: 'locked',
      link: null,
      icon: 'LOCK',
      difficulty: '⭐⭐⭐⭐⭐',
      level: 'Nível 6',
    },
  ];

  const handleProjectClick = (project) => {
    // Prevent automatic opening if modals are already open
    if (isGameModalOpen || isDetailsModalOpen) {
      return;
    }
    
    if (project.hasGame) {
      setCurrentGame(project.gameType);
      setIsGameModalOpen(true);
    } else {
      setSelectedProject(project);
      setIsDetailsModalOpen(true);
    }
  };

  const renderGame = () => {
    switch (currentGame) {
      case 'calculator':
        return <Calculator onClose={() => setIsGameModalOpen(false)} />;
      case 'tictactoe':
        return <TicTacToe onClose={() => setIsGameModalOpen(false)} />;
      case 'numberguessing':
        return <NumberGuessingGame onClose={() => setIsGameModalOpen(false)} />;
      default:
        return <NumberGuessingGame onClose={() => setIsGameModalOpen(false)} />;
    }
  };

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
    <ProjectsContainer>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projetos como Missões
        </SectionTitle>

        <ProjectsGrid>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projectsData.map((project) => (
              <ProjectCard
                key={project.id}
                variants={cardVariants}
                completed={project.status === 'completed'}
                whileHover={{ scale: 1.02 }}
              >
                <MissionStatus completed={project.status === 'completed'}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                    <MissionIcon>{project.icon}</MissionIcon>
                    {project.status === 'completed' ? 'Missão Cumprida' : 
                     project.status === 'upcoming' ? 'Próxima Missão' : 'Missão Bloqueada'}
                  </div>
                  <DifficultyLevel>
                    {project.difficulty} {project.level}
                  </DifficultyLevel>
                </MissionStatus>

                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>

                <ProjectTech>
                  {project.tech.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </ProjectTech>

                {(project.status === 'completed' || project.status === 'upcoming') && (
                  <ProjectLink 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleProjectClick(project);
                    }}
                    data-game-trigger={project.hasGame}
                  >
                    {project.hasGame ? 'Jogar Agora →' : 'Ver Detalhes →'}
                  </ProjectLink>
                )}

                {project.status === 'locked' && (
                  <LockedOverlay>
                    <LockIcon>LOCK</LockIcon>
                  </LockedOverlay>
                )}
              </ProjectCard>
            ))}
          </motion.div>
        </ProjectsGrid>
      </Container>

      <Modal 
        isOpen={isGameModalOpen} 
        onClose={() => setIsGameModalOpen(false)}
      >
        {renderGame()}
      </Modal>

      <Modal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)}
      >
        <ProjectDetailsModal 
          project={selectedProject} 
          onClose={() => setIsDetailsModalOpen(false)} 
        />
      </Modal>
    </ProjectsContainer>
  );
};

export default ProjectsSection;
