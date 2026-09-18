import * as React from 'react'

import { cn } from '@/lib/utils'

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: 'left' | 'right'
  speed?: number
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = 'left',
  speed = 30,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div className={cn('z-10 w-full overflow-hidden', className)} {...props}>
      <div className='relative flex overflow-hidden'>
        <div
          className={cn(
            'flex w-max',
            direction === 'right'
              ? 'animate-marquee-reverse'
              : 'animate-marquee',
            pauseOnHover && 'hover:[animation-play-state:paused]'
          )}
          style={{ '--duration': `${speed}s` } as React.CSSProperties}
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  )
}
