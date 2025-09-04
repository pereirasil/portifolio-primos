import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

/**
 * Tic Tac Toe game component
 * Classic 3x3 grid game with X and O
 */
const GameContainer = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  max-width: 500px;
  width: 100%;
  border: 3px solid ${theme.colors.primary};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const GameTitle = styled.h2`
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.xl};
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const GameStatus = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  background: ${theme.colors.background};
  border-radius: 12px;
  border: 2px solid ${theme.colors.primary};
`;

const StatusText = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

const CurrentPlayer = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textSecondary};
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
`;

const Cell = styled(motion.button)`
  aspect-ratio: 1;
  border: 3px solid ${theme.colors.primary};
  border-radius: 12px;
  background: ${theme.colors.surface};
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeInOut};
  color: ${props => 
    props.value === 'X' ? theme.colors.primary :
    props.value === 'O' ? theme.colors.secondary :
    theme.colors.textSecondary
  };

  &:hover {
    background: ${theme.colors.background};
    transform: scale(1.05);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
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

const TicTacToe = ({ onClose }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, won, draw

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || gameStatus !== 'playing') {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameStatus('won');
    } else if (newBoard.every(square => square !== null)) {
      setGameStatus('draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus('playing');
  };

  const getStatusMessage = () => {
    if (gameStatus === 'won') {
      const winner = calculateWinner(board);
      return `🎉 ${winner} ganhou!`;
    } else if (gameStatus === 'draw') {
      return '🤝 Empate!';
    } else {
      return `Vez do jogador: ${isXNext ? 'X' : 'O'}`;
    }
  };

  const getCurrentPlayer = () => {
    if (gameStatus === 'won') {
      return 'Parabéns!';
    } else if (gameStatus === 'draw') {
      return 'Jogo empatado!';
    } else {
      return `Jogador atual: ${isXNext ? 'X' : 'O'}`;
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

  const cellVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <GameContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <GameTitle>Jogo da Velha</GameTitle>
      
      <GameStatus>
        <StatusText>{getStatusMessage()}</StatusText>
        <CurrentPlayer>{getCurrentPlayer()}</CurrentPlayer>
      </GameStatus>

      <Board>
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            disabled={value !== null || gameStatus !== 'playing'}
            variants={cellVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {value}
          </Cell>
        ))}
      </Board>

      <ButtonContainer>
        <ActionButton
          variant="primary"
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Novo Jogo
        </ActionButton>
        
        <ActionButton
          variant="secondary"
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Fechar
        </ActionButton>
      </ButtonContainer>
    </GameContainer>
  );
};

export default TicTacToe;
