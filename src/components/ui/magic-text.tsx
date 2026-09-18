import * as React from 'react'
import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from 'framer-motion'

import { cn } from '@/lib/utils'

export interface MagicTextProps {
  text: string
  className?: string
}

interface WordProps {
  children: string
  progress: MotionValue<number>
  range: number[]
  className?: string
}

const Word: React.FC<WordProps> = ({ children, progress, range, className }) => {
  // Latched opacity: follows scroll progress upward, but never comes
  // back down - once a word has appeared it stays fully readable even
  // when the reader scrolls back up.
  const opacity = useMotionValue(0)

  useMotionValueEvent(progress, 'change', (v) => {
    const t = (v - range[0]) / (range[1] - range[0])
    const next = Math.max(0, Math.min(1, t))
    if (next > opacity.get()) {
      opacity.set(next)
    }
  })

  return (
    <span className={cn('relative mt-[12px] mr-1 text-3xl font-semibold', className)}>
      <span className='absolute opacity-20'>{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  )
}

/**
 * Scroll-linked word-by-word text reveal (HextaUI-style). Words fade in
 * sequentially as the paragraph scrolls up through the viewport; the
 * ghost copy underneath keeps layout stable at 20% opacity.
 */
export const MagicText: React.FC<MagicTextProps> = ({ text, className }) => {
  const container = useRef<HTMLParagraphElement>(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.25'],
  })

  const words = text.split(' ')

  return (
    <p ref={container} className='flex flex-wrap p-4 leading-[0.5]'>
      {words.map((word, i) => {
        const start = i / words.length

        const end = start + 1 / words.length
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            className={className}
          >
            {word}
          </Word>
        )
      })}
    </p>
  )
}
