import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

/**
 * Simple Calculator component
 * Basic calculator with operations +, -, *, /
 */
const CalculatorContainer = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  max-width: 400px;
  width: 100%;
  border: 3px solid ${theme.colors.primary};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const CalculatorTitle = styled.h2`
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.xl};
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Display = styled.div`
  background: ${theme.colors.background};
  border: 2px solid ${theme.colors.primary};
  border-radius: 12px;
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  text-align: right;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const DisplayText = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
  word-break: break-all;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.sm};
`;

const CalculatorButton = styled(motion.button)`
  padding: ${theme.spacing.lg};
  border: 2px solid ${theme.colors.primary};
  border-radius: 12px;
  background: ${props => 
    props.operator ? theme.gradients.secondary :
    props.equals ? theme.gradients.primary :
    props.clear ? theme.colors.warning :
    theme.colors.surface
  };
  color: ${props => 
    props.operator || props.equals || props.clear ? theme.colors.surface :
    theme.colors.text
  };
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  cursor: pointer;
  transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeInOut};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-top: ${theme.spacing.xl};
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

const Calculator = ({ onClose }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const equals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
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

  return (
    <CalculatorContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <CalculatorTitle>Calculadora</CalculatorTitle>
      
      <Display>
        <DisplayText>{display}</DisplayText>
      </Display>

      <ButtonGrid>
        <CalculatorButton
          clear
          onClick={clear}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          C
        </CalculatorButton>
        
        <CalculatorButton
          operator
          onClick={() => performOperation('÷')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ÷
        </CalculatorButton>
        
        <CalculatorButton
          operator
          onClick={() => performOperation('×')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ×
        </CalculatorButton>
        
        <CalculatorButton
          onClick={() => inputNumber(7)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          7
        </CalculatorButton>
        
        <CalculatorButton
          onClick={() => inputNumber(8)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          8
        </CalculatorButton>
        
        <CalculatorButton
          onClick={() => inputNumber(9)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          9
        </CalculatorButton>
        
        <CalculatorButton
          operator
          onClick={() => performOperation('-')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          -
        </CalculatorButton>
        
        <CalculatorButton
          onClick={() => inputNumber(4)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          4
        </CalculatorButton>
        
        <CalculatorButton
          onClick={() => inputNumber(5)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          5
        </CalculatorButton>
        
        <CalculatorButton
          onClick={() => inputNumber(6)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          6
        </CalculatorButton>
        
        <CalculatorButton
          operator
          onClick={() => performOperation('+')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          +
        </CalculatorButton>
        
        <CalculatorButton
          onClick={() => inputNumber(1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          1
        </CalculatorButton>
        
        <CalculatorButton
          onClick={() => inputNumber(2)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          2
        </CalculatorButton>
        
        <CalculatorButton
          onClick={() => inputNumber(3)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          3
        </CalculatorButton>
        
        <CalculatorButton
          equals
          onClick={equals}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ gridRow: 'span 2' }}
        >
          =
        </CalculatorButton>
        
        <CalculatorButton
          onClick={() => inputNumber(0)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ gridColumn: 'span 2' }}
        >
          0
        </CalculatorButton>
        
        <CalculatorButton
          onClick={inputDecimal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          .
        </CalculatorButton>
      </ButtonGrid>

      <ButtonContainer>
        <ActionButton
          variant="secondary"
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Fechar
        </ActionButton>
      </ButtonContainer>
    </CalculatorContainer>
  );
};

export default Calculator;
