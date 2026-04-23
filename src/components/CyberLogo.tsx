import React from 'react';

export function CyberLogo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hexagon Border */}
      <path 
        d="M50 10L85 30V70L50 90L15 70V30L50 10Z" 
        stroke="url(#logoGradient)" 
        strokeWidth="6" 
        strokeLinejoin="round" 
      />
      
      {/* Stylized 'C' shape inside */}
      <path 
        d="M68 35C64 30 58 27 51 27C38 27 28 37.5 28 50C28 62.5 38 73 51 73C58 73 64 70 68 65" 
        stroke="url(#logoGradient)" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Middle horizontal bar part of 'C' (if applicable based on the image) */}
      <path 
        d="M45 50H68" 
        stroke="url(#logoGradient)" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      <defs>
        <linearGradient id="logoGradient" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22D3EE" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
}
