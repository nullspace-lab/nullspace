'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { cn } from '~/utils/tailwind'

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType
    containerClassName?: string
    className?: string
    duration?: number
    clockwise?: boolean
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState(false)
  const [direction, setDirection] = useState<Direction>('TOP')

  const rotateDirection = (current: Direction): Direction => {
    const dirs: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']
    const i = dirs.indexOf(current)
    const next = clockwise ? (i - 1 + dirs.length) % dirs.length : (i + 1) % dirs.length
    return dirs[next]
  }

  const movingMap: Record<Direction, string> = {
    TOP: 'radial-gradient(20.7% 50% at 50% 0%, hsl(0 0% 100%) 0%, transparent 100%)',
    LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, hsl(0 0% 100%) 0%, transparent 100%)',
    BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, hsl(0 0% 100%) 0%, transparent 100%)',
    RIGHT: 'radial-gradient(16.2% 41.2% at 100% 50%, hsl(0 0% 100%) 0%, transparent 100%)',
  }

  const highlight =
    'radial-gradient(75% 181.16% at 50% 50%, #59c0be 0%, transparent 100%)'

  useEffect(() => {
    if (!hovered) {
      const id = setInterval(() => setDirection(prev => rotateDirection(prev)), duration * 1000)
      return () => clearInterval(id)
    }
  }, [hovered, duration, clockwise])

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex w-fit items-center justify-center gap-10 rounded-full border bg-transparent p-px transition duration-500',
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          'z-10 w-auto rounded-[inherit] bg-transparent px-4 py-2 text-white',
          className,
        )}
      >
        {children}
      </div>

      <motion.div
        className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={{ filter: 'blur(2px)' }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration }}
      />

    </Tag>
  )
}
