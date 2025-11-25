'use client'

import { useEffect, useState } from 'react'

interface TagProps {
  children: React.ReactNode
  size?: 'sm' | 'md'
}

export default function Tag({ children, size = 'md' }: TagProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDark(
        window.matchMedia('(prefers-color-scheme: dark)').matches ||
        document.documentElement.classList.contains('dark')
      )
    }
    
    checkDarkMode()
    
    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', checkDarkMode)
    
    // Also watch for class changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    
    return () => {
      mediaQuery.removeEventListener('change', checkDarkMode)
      observer.disconnect()
    }
  }, [])

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }

  return (
    <span
      className={`${sizeClasses[size]} text-primary dark:text-gray-200 font-medium rounded-full`}
      style={{
        backgroundColor: isDark 
          ? 'rgba(27, 43, 65, 0.2)' 
          : 'rgba(27, 43, 65, 0.1)',
      }}
    >
      {children}
    </span>
  )
}

