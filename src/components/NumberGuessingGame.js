import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

/**
 * Number Guessing Game component
 * Simple game where user needs to guess a random number
 */
const GameContainer = styled(motion.div)`
  background: ${theme.colors.background};
  border-radius: 16px;
  padding: ${theme.spacing.xl};
  max-width: 500px;
  width: 100%;
  text-align: center;
  border: 2px solid ${theme.colors.primary};
  box-shadow: ${theme.shadows.xl};
`;

const GameTitle = styled.h2`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize['2xl']};
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const GameDescription = styled.p`
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.xl};
  font-size: ${theme.typography.fontSize.base};
`;

const GameStatus = styled(motion.div)`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.lg};
  border-radius: 12px;
  margin-bottom: ${theme.spacing.xl};
  border: 2px solid ${props => 
    props.status === 'win' ? theme.colors.accent :
    props.status === 'lose' ? theme.colors.error :
    theme.colors.primary
  };
`;

const StatusText = styled.p`
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.md};
`;

const StatusSubtext = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const GameInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xl};
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const InfoItem = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.md};
  border-radius: 8px;
  flex: 1;
  border: 1px solid ${theme.colors.primary};
`;

const InfoLabel = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
  margin-bottom: ${theme.spacing.xs};
`;

const InfoValue = styled.p`
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const InputContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const GameInput = styled.input`
  width: 100%;
  max-width: 200px;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.primary};
  border-radius: 8px;
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.lg};
  text-align: center;
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.md};

  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const GameButton = styled(motion.button)`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: 8px;
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeInOut};
  border: 2px solid transparent;

  ${props => props.variant === 'primary' && `
    background: ${theme.gradients.primary};
    color: ${theme.colors.text};
    
    &:hover {
      background: ${theme.gradients.secondary};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }
  `}

  ${props => props.variant === 'secondary' && `
    background: transparent;
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    
    &:hover {
      background: ${theme.colors.primary};
      color: ${theme.colors.text};
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const NumberDisplay = styled(motion.div)`
  font-size: 4rem;
  font-weight: ${theme.typography.fontWeight.extrabold};
  color: ${theme.colors.primary};
  margin: ${theme.spacing.lg} 0;
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
`;

const NumberGuessingGame = ({ onClose }) => {
  const [secretNumber, setSecretNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, win, lose
  const [message, setMessage] = useState('');
  const [maxAttempts] = useState(7);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newSecretNumber = Math.floor(Math.random() * 100) + 1;
    setSecretNumber(newSecretNumber);
    setGuess('');
    setAttempts(0);
    setGameStatus('playing');
    setMessage('Adivinhe um número entre 1 e 100!');
  };

  const handleGuess = () => {
    const guessNumber = parseInt(guess);
    
    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      setMessage('Por favor, digite um número válido entre 1 e 100!');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guessNumber === secretNumber) {
      setGameStatus('win');
      setMessage(`Parabéns! Você acertou em ${newAttempts} tentativa${newAttempts > 1 ? 's' : ''}!`);
    } else if (newAttempts >= maxAttempts) {
      setGameStatus('lose');
      setMessage(`Game Over! O número era ${secretNumber}. Tente novamente!`);
    } else {
      const hint = guessNumber > secretNumber ? 'menor' : 'maior';
      setMessage(`Errou! O número é ${hint} que ${guessNumber}. Tentativa ${newAttempts}/${maxAttempts}`);
    }

    setGuess('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && gameStatus === 'playing') {
      handleGuess();
    }
  };


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

  const numberVariants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <GameContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <GameTitle>Joguinho de Adivinhar Número</GameTitle>
      <GameDescription>
        Tente adivinhar o número secreto entre 1 e 100!
        Você tem {maxAttempts} tentativas para acertar.
      </GameDescription>

      <GameInfo>
        <InfoItem>
          <InfoLabel>Tentativas</InfoLabel>
          <InfoValue>{attempts}/{maxAttempts}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Status</InfoLabel>
          <InfoValue>
            {gameStatus === 'playing' ? 'Jogando' :
             gameStatus === 'win' ? 'Vitória!' : 'Derrota!'}
          </InfoValue>
        </InfoItem>
      </GameInfo>

      {gameStatus === 'playing' && (
        <InputContainer>
          <GameInput
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite seu palpite"
            min="1"
            max="100"
            autoFocus
          />
        </InputContainer>
      )}

      <GameStatus status={gameStatus}>
        <StatusText>{message}</StatusText>
        {gameStatus !== 'playing' && (
          <StatusSubtext>
            {gameStatus === 'win' 
              ? 'Você é um verdadeiro programador!' 
              : 'Não desista! Programadores aprendem com os erros!'}
          </StatusSubtext>
        )}
      </GameStatus>

      {gameStatus !== 'playing' && secretNumber && (
        <NumberDisplay
          variants={numberVariants}
          animate="animate"
        >
          {secretNumber}
        </NumberDisplay>
      )}

      <ButtonContainer>
        {gameStatus === 'playing' ? (
          <GameButton
            variant="primary"
            onClick={handleGuess}
            disabled={!guess.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Adivinhar
          </GameButton>
        ) : (
          <GameButton
            variant="primary"
            onClick={startNewGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Jogar Novamente
          </GameButton>
        )}
        
        <GameButton
          variant="secondary"
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Fechar
        </GameButton>
      </ButtonContainer>
    </GameContainer>
  );
};

export default NumberGuessingGame;
