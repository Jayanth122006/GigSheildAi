import React from 'react';

const Card = ({ children, className = '', hover = true, onClick, style = {} }) => {
  // Use the refined .glass-panel class from our globally stunning CSS
  // We'll rename the hover behavior to be conditional via inline styles or classes
  const baseClass = 'glass-panel p-8'; 
  const hoverClass = !hover ? 'no-hover' : ''; // no-hover can negate the CSS hover
  
  return (
    <div 
      className={`${baseClass} ${hoverClass} ${className}`}
      onClick={onClick}
      style={{
        ...style,
        cursor: onClick ? 'pointer' : 'default',
        transform: !hover ? 'none' : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
