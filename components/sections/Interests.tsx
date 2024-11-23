'use client'

import React, { useState, useRef, useEffect } from "react";
import { Code, Cat, Guitar, BookOpen } from 'lucide-react';
import { GiPickle } from "react-icons/gi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LumberjackGame from './LumberjackGame';

export default function Interests() {
  const [showGame, setShowGame] = useState(false);
  const [transforming, setTransforming] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);

  const interests = [
    { name: 'Programming', icon: Code },
    { name: 'Cats', icon: Cat },
    { name: 'Pickles', icon: GiPickle },
    { name: 'Philosophy', icon: BookOpen },
    { name: 'Guitar', icon: Guitar },
  ];

  const handlePickleClick = () => {
    setTransforming(true);
    setTimeout(() => {
      setShowGame(true);
      setTimeout(() => {
        gameRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1000);
  };

  const handleCloseGame = () => {
    setShowGame(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!showGame) {
      setTransforming(false);
    }
  }, [showGame]);

  return (
    <section className="w-full bg-gray-800 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-green-400 text-center">My Interests</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {interests.map((interest, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`bg-gray-700 p-6 rounded-full shadow-lg mb-4 ${
                  interest.name === 'Pickles' && transforming ? 'animate-transform' : ''
                }`}
              >
                <TooltipProvider delayDuration={50}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`cursor-pointer group ${
                          interest.name === 'Pickles' ? 'transformable' : ''
                        }`}
                        onClick={interest.name === 'Pickles' ? handlePickleClick : undefined}
                      >
                        <interest.icon
                          className={`w-12 h-12 text-green-500 transition-all duration-200 ${
                            interest.name === 'Pickles' ? 'animate-shake group-hover:animate-none' : ''
                          }`}
                        />
                      </div>
                    </TooltipTrigger>
                    {interest.name === 'Pickles' && (
                      <TooltipContent side="top" sideOffset={1}>
                        <p>Click me</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-lg font-semibold text-green-400">{interest.name}</span>
            </div>
          ))}
        </div>
      </div>
      {showGame && (
        <div ref={gameRef} className="mt-20">
          <LumberjackGame onClose={handleCloseGame} />
        </div>
      )}
      <style jsx global>{`
        @keyframes shake {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-shake {
          animation: shake 0.5s infinite;
        }
        .group:hover .animate-shake {
          animation: none;
        }
        @keyframes transform-to-tree {
          0% { transform: scale(1); }
          50% { transform: scale(1.5) rotate(45deg); }
          100% { transform: scale(1.8) rotate(0deg); }
        }
        .animate-transform {
          animation: transform-to-tree 1s forwards;
        }
      `}</style>
    </section>
  );
}
