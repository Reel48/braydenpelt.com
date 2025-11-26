'use client'

interface TagProps {
  children: React.ReactNode
  size?: 'sm' | 'md'
}

export default function Tag({ children, size = 'md' }: TagProps) {
  // Dark mode disabled - always use light mode
  const isDark = false

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }

  return (
    <span
      className={`${sizeClasses[size]} text-blue-500 font-medium rounded-full`}
      style={{
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      }}
    >
      {children}
    </span>
  )
}

