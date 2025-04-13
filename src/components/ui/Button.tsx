// src/components/ui/Button.tsx
import React from 'react'
import clsx from 'clsx'

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  disabled?: boolean
  className?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100',
  primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const Button: React.FC<ButtonProps> = ({
                                         children,
                                         onClick,
                                         type = 'button',
                                         variant = 'default',
                                         disabled = false,
                                         className = '',
                                       }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'px-3 py-1 rounded text-sm transition',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
