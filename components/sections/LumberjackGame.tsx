import React, { useState, useEffect, useCallback } from "react";
import { X } from 'lucide-react';

interface LumberjackGameProps {
  onClose: () => void;
}

interface Branch {
  side: 'left' | 'right';
  position: number; 
  isNew: boolean;
}

export default function LumberjackGame({ onClose }: LumberjackGameProps) {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState<'left' | 'right'>('left');
  const [branches, setBranches] = useState<Branch[]>(generateBranches(7));
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100);
  const [isChopping, setIsChopping] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [highScore, setHighScore] = useState(0);

  function generateBranches(count: number): Branch[] {
    return Array.from({ length: count }, (_, index) => ({
      side: Math.random() > 0.5 ? 'left' as const : 'right' as const,
      position: index * 10,  
      isNew: false
    }));
  }

  useEffect(() => {
    // Update difficulty based on score
    setDifficulty(Math.floor(score / 10) + 1);
  }, [score]);

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            setGameOver(true);
            setHighScore(current => Math.max(current, score));
            return 0;
          }
          // Time decreases faster with higher difficulty
          return prev - (0.8 + difficulty * 0.2);
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [gameOver, timeLeft, difficulty, score]);

  const handleChop = useCallback((side: 'left' | 'right') => {
    if (gameOver) return;

    setIsChopping(true);
    setTimeout(() => setIsChopping(false), 100);

    // Find the closest branch to the character
    const lowestBranch = branches.reduce((lowest, branch) => 
      branch.position > lowest.position ? branch : lowest
    );

    if (lowestBranch.side === side) {
      setGameOver(true);
      setHighScore(current => Math.max(current, score));
    } else {
      setScore(score + 1);
      // Less time bonus with higher difficulty
      setTimeLeft((prev) => Math.min(prev + Math.max(5, 15 - difficulty), 100));

      // Update all branches
      setBranches(prev => {
        const remainingBranches = prev.filter(b => b !== lowestBranch);
        
        // Asignar posiciones fijas basadas en el índice
        const movedBranches = remainingBranches.map((branch, index) => ({
          ...branch,
          position: (index + 1) * 10, // Cada rama estará separada por 10 unidades
          isNew: false
        }));

        // Add a new branch at the top
        const newBranches = [];
        if (movedBranches.length < 7) {
          newBranches.push({
            side: Math.random() > 0.5 ? 'left' as const : 'right' as const,
            position: 0,
            isNew: true
          });
        }

        return [...newBranches, ...movedBranches] as Branch[];
      });

      setPosition(side);
    }
  }, [branches, gameOver, score, difficulty]);

  const restartGame = () => {
    setScore(0);
    setBranches(generateBranches(7));
    setGameOver(false);
    setPosition('left');
    setTimeLeft(100);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handleChop('left');
      } else if (event.key === 'ArrowRight') {
        handleChop('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleChop]);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-400 to-sky-200 flex flex-col items-center justify-center relative">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
        aria-label="Close game"
      >
        <X size={24} />
      </button>
      <h1 className="text-4xl text-white font-bold mb-6 drop-shadow-lg">Lumberjack</h1>
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex gap-8 items-center">
          <p className="text-2xl text-white font-bold drop-shadow-md">Score: {score}</p>
          <p className="text-xl text-white font-semibold drop-shadow-md">High Score: {highScore}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-64 h-4 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-100"
              style={{ width: `${timeLeft}%` }}
            />
          </div>
          <p className="text-sm text-white font-medium">Level {difficulty}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-20">
        <button
          className={`bg-red-600 text-white py-4 px-8 rounded-lg transform transition-transform ${
            !gameOver && 'hover:scale-105'
          } active:scale-95 font-bold text-lg shadow-lg ${isChopping && position === 'left' ? 'animate-chop' : ''}`}
          onClick={() => handleChop('left')}
          disabled={gameOver}
        >
          ←
        </button>
        <div className="relative w-32 h-96">
          {/* Tronco principal */}
          <div className={`absolute inset-x-8 top-0 bottom-0 bg-gradient-to-r from-yellow-800 to-yellow-700 rounded-sm ${isChopping ? 'animate-shake' : ''}`}>
            {/* Textura del tronco */}
            <div className="absolute inset-0 opacity-20 bg-repeat" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h20v20H0V0zm10 17L3 5h14L10 17z" fill="%23000" fill-opacity=".1"/%3E%3C/svg%3E")' }}></div>
          </div>
          {/* Ramas */}
          {branches.map((branch, index) => (
            <div
              key={index}
              className={`absolute h-8 w-20 transition-all duration-200 ${
                branch.side === 'left' ? '-left-16' : 'left-24'
              } ${branch.isNew ? 'animate-slide-down' : ''}`}
              style={{ 
                top: `${branch.position}%`,
                background: 'linear-gradient(to bottom, #2d5a27, #1a4314)',
                transform: `rotate(${branch.side === 'left' ? '-20deg' : '20deg'})`,
                borderRadius: '4px',
                transition: 'top 0.2s ease-in-out',
              }}
            >
              <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>
          ))}
          {/* Personaje */}
          <div
            className={`absolute w-16 h-16 transition-all duration-100 ${
              position === 'left' ? '-left-20' : 'left-32'
            } ${isChopping ? 'animate-chop' : ''}`}
            style={{ bottom: '0' }}
          >
            <div className="relative w-full h-full">
              {/* Cuerpo */}
              <div className="absolute inset-x-4 top-4 bottom-0 bg-blue-600 rounded-t-lg"></div>
              {/* Cabeza */}
              <div className="absolute inset-x-6 top-0 h-6 bg-yellow-700 rounded-full">
                <div className="absolute inset-x-2 top-1 h-2 bg-white rounded-full"></div>
              </div>
              {/* Hacha */}
              <div className={`absolute w-8 h-2 bg-gray-400 transition-transform ${isChopping ? 'rotate-45' : 'rotate-0'}`}
                style={{
                  right: position === 'left' ? '-16px' : 'auto',
                  left: position === 'right' ? '-16px' : 'auto',
                  top: '50%',
                  transformOrigin: position === 'left' ? 'right' : 'left',
                }}
              >
                <div className="absolute top-0 h-6 w-4 bg-gray-300"
                  style={{
                    right: position === 'left' ? '-4px' : 'auto',
                    left: position === 'right' ? '-4px' : 'auto',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <button
          className={`bg-blue-600 text-white py-4 px-8 rounded-lg transform transition-transform ${
            !gameOver && 'hover:scale-105'
          } active:scale-95 font-bold text-lg shadow-lg ${isChopping && position === 'right' ? 'animate-chop' : ''}`}
          onClick={() => handleChop('right')}
          disabled={gameOver}
        >
          →
        </button>
      </div>
      {gameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 transform transition-all animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800">Game Over!</h2>
            <p className="text-xl text-gray-600">Final Score: {score}</p>
            {score === highScore && score > 0 && (
              <p className="text-lg text-green-600 font-semibold">New High Score!</p>
            )}
            <button
              onClick={restartGame}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg transform transition-transform hover:scale-105 active:scale-95 font-bold text-lg shadow-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
