import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { cn } from '@/lib/utils'

export interface ParallaxFeature {
  id: string
  title: string
  description: string
  /** Panel revealed with the clip-path wipe. Falls back to the id mark. */
  visual?: ReactNode
  reverse?: boolean
}

interface ParallaxFeatureRowProps {
  feature: ParallaxFeature
}

/**
 * One row of the parallax feature section. Extracted so each row owns
 * its scroll hooks at the top level of a component - the upstream
 * HextaUI snippet calls useScroll/useTransform inside a .map(), which
 * violates the rules of hooks.
 */
const ParallaxFeatureRow = ({ feature }: ParallaxFeatureRowProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  })

  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [0, 1])
  const clipProgress = useTransform(
    scrollYProgress,
    [0, 0.7],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  )
  const translateContent = useTransform(scrollYProgress, [0, 1], [-50, 0])

  return (
    <div
      ref={ref}
      className={cn(
        'flex min-h-[50vh] items-center justify-between gap-20 md:gap-40',
        feature.reverse && 'flex-row-reverse'
      )}
    >
      <motion.div
        style={{ y: translateContent }}
        className='w-full max-w-xl md:max-w-2xl'
      >
        <div className='text-3xl font-semibold tracking-tight text-foreground md:text-4xl'>
          {feature.title}
        </div>
        <motion.p
          style={{ y: translateContent }}
          className='mt-12 text-base leading-relaxed text-muted-foreground'
        >
          {feature.description}
        </motion.p>
      </motion.div>
      <motion.div
        style={{ opacity: opacityContent, clipPath: clipProgress }}
        className='relative'
      >
        {feature.visual ?? (
          <div className='flex size-64 items-center justify-center rounded-2xl border border-border/50 bg-card md:size-80'>
            <span className='font-mono text-5xl font-semibold text-primary'>
              {feature.id}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export interface ParallaxScrollFeatureSectionProps {
  features: ParallaxFeature[]
  className?: string
}

/**
 * Scroll-driven feature showcase (HextaUI-style): each row's text
 * parallaxes up while the opposite panel wipes in via clip-path.
 * Rows alternate direction automatically.
 */
export const ParallaxScrollFeatureSection = ({
  features,
  className,
}: ParallaxScrollFeatureSectionProps) => (
  <div className={cn('flex flex-col', className)}>
    {features.map((feature, index) => (
      <ParallaxFeatureRow
        key={feature.id}
        feature={{ ...feature, reverse: feature.reverse ?? index % 2 === 1 }}
      />
    ))}
  </div>
)
