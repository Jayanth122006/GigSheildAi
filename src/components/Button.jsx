import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  disabled = false,
  fullWidth = false,
  type = 'button',
  style = {}
}) => {
  
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: 'var(--radius-sm)',
    gap: '0.5rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    border: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    ...style
  };

  const variants = {
    primary: {
      background: 'var(--secondary)', // The Slate Black
      color: 'white',
      border: '1px solid var(--secondary)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    },
    secondary: {
      background: 'white',
      color: 'var(--text-main)',
      border: '1px solid var(--border-light)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
    },
    danger: {
      background: 'var(--primary)', // The Rose Red
      color: 'white',
      border: '1px solid var(--primary)',
      boxShadow: '0 1px 2px rgba(225, 29, 72, 0.2)'
    },
    success: {
      background: 'var(--success)',
      color: 'white',
      border: '1px solid var(--success)',
    }
  };

  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '0.95rem' },
    lg: { padding: '1rem 2rem', fontSize: '1.125rem' }
  };

  const currentStyle = {
    ...baseStyle,
    ...variants[variant],
    ...sizes[size],
  };

  return (
    <button 
      type={type}
      style={currentStyle} 
      className={`${className}`} 
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      onMouseOver={(e) => {
        if (!disabled) {
          if (variant === 'primary') {
             e.currentTarget.style.background = '#1e293b';
             e.currentTarget.style.borderColor = '#1e293b';
             e.currentTarget.style.transform = 'translateY(-1px)';
             e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          } else if (variant === 'secondary') {
             e.currentTarget.style.background = '#f8fafc';
             e.currentTarget.style.transform = 'translateY(-1px)';
          } else if (variant === 'danger') {
             e.currentTarget.style.background = 'var(--primary-hover)';
             e.currentTarget.style.transform = 'translateY(-1px)';
             e.currentTarget.style.boxShadow = '0 4px 10px rgba(225, 29, 72, 0.3)';
          }
        }
      }}
      onMouseOut={(e) => {
        if (!disabled) {
           e.currentTarget.style.background = variants[variant].background;
           e.currentTarget.style.borderColor = variants[variant].border;
           e.currentTarget.style.transform = 'translateY(0)';
           e.currentTarget.style.boxShadow = variants[variant].boxShadow || 'none';
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;
