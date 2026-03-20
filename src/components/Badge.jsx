import React from 'react';

const Badge = ({ children, variant = 'primary', className = '' }) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.2rem 0.6rem',
    borderRadius: '4px',
    fontSize: '0.725rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    textTransform: 'uppercase'
  };

  const variants = {
    primary: { background: 'var(--primary)', color: 'white', border: '1px solid var(--primary)' },
    success: { background: 'var(--success)', color: 'black', border: '1px solid var(--success)' },
    warning: { background: 'var(--warning)', color: 'black', border: '1px solid var(--warning)' },
    danger: { background: 'var(--danger)', color: 'white', border: '1px solid var(--danger)' },
    neutral: { background: '#111', color: 'var(--text-muted)', border: '1px solid #333' }
  };

  return (
    <span style={{ ...baseStyle, ...variants[variant] }} className={className}>
      {children}
    </span>
  );
};

export default Badge;
