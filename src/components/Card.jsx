import React from 'react';

const Card = ({ children, className = '', hover = true, onClick, style = {} }) => {
  const baseClass = 'glass-panel p-8'; 
  const hoverClass = !hover ? 'no-hover' : '';
  
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
