'use client';

import { useEffect, useState, useRef } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=-';

export function CyberText({ text, className = "" }: { text: string, className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startAnimation = () => {
      interval = setInterval(() => {
        setDisplayText(() => 
          text.split("")
            .map((char, index) => {
              if(index < iteration) return text[index];
              if(char === " ") return " ";
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );
        
        if(iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    };

    startAnimation();
    return () => clearInterval(interval);
  }, [text, isHovered]);

  return (
    <span 
      className={className}
      onMouseEnter={() => setIsHovered(!isHovered)}
    >
      {displayText}
    </span>
  );
}
