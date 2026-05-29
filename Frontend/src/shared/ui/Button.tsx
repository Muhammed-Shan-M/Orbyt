import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  loading?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const base =
    'relative flex items-center justify-center gap-2 rounded-lg font-display font-semibold text-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const variants = {
    primary: 'bg-orbyt-emerald text-orbyt-bg hover:bg-orbyt-emerald3 py-3 px-6 w-full',
    ghost:   'bg-transparent border border-orbyt-border text-orbyt-muted2 hover:border-orbyt-border2 hover:text-orbyt-text py-3 px-6 w-full',
    outline: 'bg-transparent border border-orbyt-emerald/40 text-orbyt-emerald hover:bg-orbyt-emerald/10 py-3 px-6 w-full',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}

export default Button
