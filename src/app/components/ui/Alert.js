'use client';

import React from 'react';

export function Alert({
  children,
  className = '',
  variant = 'default',
  ...props
}) {
  return (
    <div
      role='alert'
      className={`rounded-lg border p-4 ${
        variant === 'destructive'
          ? 'border-red-500 bg-red-50 text-red-700'
          : 'border-gray-200 bg-white'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertTitle({ children, className = '', ...props }) {
  return (
    <h5
      className={`mb-1 font-medium leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h5>
  );
}

export function AlertDescription({ children, className = '', ...props }) {
  return (
    <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props}>
      {children}
    </div>
  );
}
