import type React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => (
  <label className="field">
    <span>{label}</span>
    <input {...props} />
    {error ? <small>{error}</small> : null}
  </label>
);
