import * as React from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
}

export function H1({ children, className, ...props }: TypographyProps) {
  return (
    <h1 
      className={cn("text-2xl sm:text-4xl lg:text-6xl font-display font-bold tracking-tight", className)} 
      {...props}
    >
      {children}
    </h1>
  )
}

export function H2({ children, className, ...props }: TypographyProps) {
  return (
    <h2 
      className={cn("text-xl sm:text-3xl lg:text-4xl font-display font-semibold tracking-tight", className)} 
      {...props}
    >
      {children}
    </h2>
  )
}

export function H3({ children, className, ...props }: TypographyProps) {
  return (
    <h3 
      className={cn("text-lg sm:text-2xl lg:text-3xl font-display font-semibold tracking-tight", className)} 
      {...props}
    >
      {children}
    </h3>
  )
}

export function Lead({ children, className, ...props }: TypographyProps) {
  return (
    <p 
      className={cn("mt-2 text-base sm:text-lg lg:text-xl text-muted-foreground", className)} 
      {...props}
    >
      {children}
    </p>
  )
}

export function Body({ children, className, ...props }: TypographyProps) {
  return (
    <p 
      className={cn("text-sm sm:text-base text-foreground", className)} 
      {...props}
    >
      {children}
    </p>
  )
}

export function Small({ children, className, ...props }: TypographyProps) {
  return (
    <small 
      className={cn("text-xs sm:text-sm text-muted-foreground", className)} 
      {...props}
    >
      {children}
    </small>
  )
}