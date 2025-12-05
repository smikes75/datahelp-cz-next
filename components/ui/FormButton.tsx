import React from 'react';

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function FormButton({ children, ...props }: FormButtonProps) {
  return (
    <button
      {...props}
      className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
