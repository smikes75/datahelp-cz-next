import React from 'react';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function FormTextarea({ label, error, ...props }: FormTextareaProps) {
  const id = props.id || props.name;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <textarea
        {...props}
        id={id}
        className={`mt-1 block w-full rounded-md border-2 px-4 py-3 shadow-sm transition-colors resize-none
          ${error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20'
          } focus:outline-none`}
        aria-describedby={errorId}
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
