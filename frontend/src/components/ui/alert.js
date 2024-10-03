// Crea un file alert.js nel percorso corretto
import React from 'react';

export const Alert = ({ variant = 'default', children }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    destructive: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`p-4 rounded-md ${variants[variant] || variants.default}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => {
  return <div className="text-sm">{children}</div>;
};
