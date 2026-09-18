import { motion, type Variants } from 'framer-motion'
import { ArrowRight, CalendarIcon, FileTextIcon, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import AnimatedTextCycle from './animated-text-cycle'
import { Button } from '@/components/ui/button'
import { Marquee } from '@/components/ui/marquee'

type Point = {
  x: number
  y: number
}

interface WaveConfig {
  offset: number
  amplitude: number
  frequency: number
  color: string
  opacity: number
}

const SOLUTION_BRIEF_URL = 'https://www.supermicro.com/solutions/Solution_Brief_SMCI_AMD_Piovation.pdf'

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.12 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const statsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.08 },
  },
}

export function LandingPageHero() {
  const { t } = useTranslation('landing')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef<Point>({ x: 0, y: 0 })
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 })
  const partnersMarqueeRef = useRef<HTMLDivElement | null>(null)

  // Partner marquee "center spotlight": logos travel in grayscale and reveal
  // their colors as they pass through the horizontal center of the strip,
  // fading back to grayscale as they leave. Hover keeps a logo colored
  // wherever it sits. Driven by rAF because the marquee moves via a CSS
  // transform animation - there is no scroll position to hook into.
  useEffect(() => {
    const container = partnersMarqueeRef.current
    if (!container) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return undefined

    const items = Array.from(
      container.querySelectorAll<HTMLElement>('[data-marquee-item]')
    )
    if (items.length === 0) return undefined

    const hovered = new Set<HTMLElement>()
    let animationId = 0

    const update = () => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const revealRadius = Math.max(rect.width * 0.22, 160)

      for (const item of items) {
        const itemRect = item.getBoundingClientRect()
        const distance = Math.abs(
          itemRect.left + itemRect.width / 2 - centerX
        )
        const intensity = hovered.has(item)
          ? 1
          : Math.max(0, 1 - distance / revealRadius)

        const img = item.firstElementChild
        if (img instanceof HTMLElement) {
          img.style.filter = `grayscale(${(1 - intensity).toFixed(3)})`
          img.style.opacity = (0.7 + 0.3 * intensity).toFixed(3)
        }
      }

      animationId = window.requestAnimationFrame(update)
    }

    const handleMouseOver = (event: MouseEvent) => {
      const item = (event.target as HTMLElement).closest(
        '[data-marquee-item]'
      )
      if (item instanceof HTMLElement) hovered.add(item)
    }

    const handleMouseOut = (event: MouseEvent) => {
      const item = (event.target as HTMLElement).closest(
        '[data-marquee-item]'
      )
      if (item instanceof HTMLElement) hovered.delete(item)
    }

    container.addEventListener('mouseover', handleMouseOver)
    container.addEventListener('mouseout', handleMouseOut)
    animationId = window.requestAnimationFrame(update)

    return () => {
      container.removeEventListener('mouseover', handleMouseOver)
      container.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animationId)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let animationId: number
    let time = 0

    const computeThemeColors = () => {
      const rootStyles = getComputedStyle(document.documentElement)

      const resolveColor = (variables: string[], alpha = 1) => {
        const tempEl = document.createElement('div')
        tempEl.style.position = 'absolute'
        tempEl.style.visibility = 'hidden'
        tempEl.style.width = '1px'
        tempEl.style.height = '1px'
        document.body.appendChild(tempEl)

        let color = `rgba(255, 255, 255, ${alpha})`

        for (const variable of variables) {
          const value = rootStyles.getPropertyValue(variable).trim()
          if (value) {
            tempEl.style.backgroundColor = `var(${variable})`
            const computedColor = getComputedStyle(tempEl).backgroundColor

            if (computedColor && computedColor !== 'rgba(0, 0, 0, 0)') {
              if (alpha < 1) {
                const rgbMatch = computedColor.match(
                  /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
                )
                if (rgbMatch) {
                  color = `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`
                } else {
                  color = computedColor
                }
              } else {
                color = computedColor
              }
              break
            }
          }
        }

        document.body.removeChild(tempEl)
        return color
      }

      return {
        backgroundTop: resolveColor(['--background'], 1),
        backgroundBottom: resolveColor(['--muted', '--background'], 0.95),
        wavePalette: [
          {
            offset: 0,
            amplitude: 70,
            frequency: 0.003,
            color: resolveColor(['--primary'], 0.8),
            opacity: 0.45,
          },
          {
            offset: Math.PI / 2,
            amplitude: 90,
            frequency: 0.0026,
            color: resolveColor(['--accent', '--primary'], 0.7),
            opacity: 0.35,
          },
          {
            offset: Math.PI,
            amplitude: 60,
            frequency: 0.0034,
            color: resolveColor(['--secondary', '--foreground'], 0.65),
            opacity: 0.3,
          },
          {
            offset: Math.PI * 1.5,
            amplitude: 80,
            frequency: 0.0022,
            color: resolveColor(['--primary-foreground', '--foreground'], 0.25),
            opacity: 0.25,
          },
          {
            offset: Math.PI * 2,
            amplitude: 55,
            frequency: 0.004,
            color: resolveColor(['--foreground'], 0.2),
            opacity: 0.2,
          },
        ] satisfies WaveConfig[],
      }
    }

    let themeColors = computeThemeColors()

    const observer = new MutationObserver(() => {
      themeColors = computeThemeColors()
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const mouseInfluence = prefersReducedMotion ? 10 : 70
    const influenceRadius = prefersReducedMotion ? 160 : 320
    const smoothing = prefersReducedMotion ? 0.04 : 0.1

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const recenterMouse = () => {
      const centerPoint = { x: canvas.width / 2, y: canvas.height / 2 }
      mouseRef.current = centerPoint
      targetMouseRef.current = centerPoint
    }

    const handleResize = () => {
      resizeCanvas()
      recenterMouse()
    }

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current = { x: event.clientX, y: event.clientY }
    }

    const handleMouseLeave = () => {
      recenterMouse()
    }

    resizeCanvas()
    recenterMouse()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const drawWave = (wave: WaveConfig) => {
      ctx.save()
      ctx.beginPath()

      // Sample every 2px so the curve stays smooth even where the
      // mouse-influence bump is at its steepest.
      for (let x = 0; x <= canvas.width; x += 2) {
        const dx = x - mouseRef.current.x
        const dy = canvas.height / 2 - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        // Smoothstep falloff instead of a linear ramp: the previous
        // max(0, 1 - d/R) cone has slope kinks at the cursor and at the
        // cutoff radius, which rendered as straight-line segments and
        // corners on the wave while hovering. Smoothstep is C1-continuous
        // (zero slope at both ends), so the bump blends into the curve.
        const falloff = Math.max(0, 1 - distance / influenceRadius)
        const influence = falloff * falloff * (3 - 2 * falloff)

        // Mouse interaction = amplitude modulation: the wave swells where
        // the cursor points. The previous implementation ADDED an
        // independent ripple sin(time*0.001 + x*0.01 + offset), whose
        // ~628px spatial period was much shorter than the wave's own
        // (~2000px+); holding the mouse still let that fast ripple slide
        // through the bump, visibly twisting and shearing the wave.
        // Scaling the wave's own smooth sine can never introduce kinks.
        const amplitude =
          wave.amplitude * (1 + (influence * mouseInfluence) / 100)

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) *
            amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) *
            (amplitude * 0.45)

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.lineWidth = 2.5
      ctx.strokeStyle = wave.color
      ctx.globalAlpha = wave.opacity
      ctx.shadowBlur = 35
      ctx.shadowColor = wave.color
      ctx.stroke()

      ctx.restore()
    }

    const animate = () => {
      time += 1

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * smoothing
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * smoothing

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, themeColors.backgroundTop)
      gradient.addColorStop(1, themeColors.backgroundBottom)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      themeColors.wavePalette.forEach(drawWave)

      animationId = window.requestAnimationFrame(animate)
    }

    animationId = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationId)
      observer.disconnect()
    }
  }, [])

  return (
    <section
      className='relative isolate flex w-full flex-col items-center justify-center overflow-hidden bg-background'
      style={{ minHeight: 'min(100svh, 900px)' }}
      role='region'
      aria-label='PioSphere hero'
    >
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className='absolute inset-0 h-full w-full'
        aria-hidden='true'
      />

      {/* Ambient glow blobs */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-foreground/[0.035] blur-[140px] dark:bg-foreground/[0.06]' />
        <div className='absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-foreground/[0.025] blur-[120px] dark:bg-foreground/[0.05]' />
        <div className='absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/[0.04] blur-[150px] dark:bg-primary/[0.07]' />
      </div>

      {/* Content */}
      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-start justify-center px-6 py-16 text-left md:px-8 md:py-24 lg:px-12'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='w-full flex flex-col'
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className='mb-4 flex items-center gap-2 text-sm font-medium text-foreground/60'
          >
            <Sparkles className='size-4' aria-hidden='true' />
            {t('hero.badge')}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className='mb-5 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-7xl lg:text-[4.5rem] leading-[1.05]'
          >
            <AnimatedTextCycle
              words={t('hero.headlineWords', { returnObjects: true }) as string[]}
              interval={3000}
              className='text-foreground font-semibold'
            />{' '}
            {t('hero.headlineMain')}<br />{t('hero.headlineSuffix')}
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            variants={itemVariants}
            className='mb-8 max-w-2xl text-base text-foreground/60 md:text-xl leading-relaxed'
          >
            {t('hero.description')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className='flex flex-col items-start gap-4 sm:flex-row sm:items-center'
          >
            <Button
              size='lg'
              className='group gap-2 rounded-lg bg-foreground px-6 text-base font-medium text-background hover:bg-foreground/90'
              asChild
            >
              <a href="https://meetings-eu1.hubspot.com/mazda?uuid=36465083-6274-4cc0-a076-e62c90c5450c" target="_blank" rel="noopener noreferrer">
                <CalendarIcon className='size-4' aria-hidden='true' />
                {t('hero.scheduleDemo')}
                <ArrowRight
                  className='size-4 transition-transform group-hover:translate-x-1'
                  aria-hidden='true'
                />
              </a>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='group gap-2 rounded-lg border-border/40 bg-background/10 px-6 text-base font-medium text-foreground backdrop-blur transition-all hover:bg-background/20'
              asChild
            >
              <a href={SOLUTION_BRIEF_URL} target='_blank' rel="noopener noreferrer">
                <FileTextIcon className='size-4 text-foreground/70' aria-hidden='true' />
                {t('hero.solutionBrief')}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Partner Marquee Section */}
      <div className="relative z-20 w-full pointer-events-auto pb-6 md:pb-12 mt-auto">
        <motion.div
          variants={statsVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto flex w-full max-w-7xl px-6 md:px-8 lg:px-12"
        >
          <div className="flex w-full flex-row items-center gap-4 md:gap-8 bg-transparent">
            <div className="flex-shrink-0 text-[11px] md:text-sm font-medium text-foreground/50 tracking-wide text-left leading-snug">
              <p>{t('hero.trustedBy')}</p>
              <p>{t('hero.trustedIndustries')}</p>
            </div>

            <div className="flex-grow w-full overflow-hidden" ref={partnersMarqueeRef}>
              <Marquee
                speed={40}
                className="[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
              >
                {[
                  { src: '/images/partners/AMD_Logo.png', alt: 'AMD' },
                  { src: '/images/partners/smc_logo.png', alt: 'Supermicro' },
                  { src: '/images/partners/gigaio.png', alt: 'GigaIO' },
                  { src: '/images/partners/Loka-AI-Logo-big.png', alt: 'Loka AI' },
                  { src: '/images/partners/amax.jpg', alt: 'AMAX' },
                  { src: '/images/partners/boston-it.png', alt: 'Boston IT' },
                  { src: '/images/partners/regio-ausgburg.jpg', alt: 'Regio Augsburg' },
                  { src: '/images/partners/stadt-diepholz.jpeg', alt: 'Stadt Diepholz' },
                  { src: '/images/partners/gemeinde-grasbrunn.jpeg', alt: 'Gemeinde Grasbrunn' },
                  { src: '/images/partners/doitnow.png', alt: 'DoItNow' },
                  { src: '/images/partners/parcs.png', alt: 'Parcs' },
                ].map((partner, idx) => (
                  <div
                    key={idx}
                    data-marquee-item
                    className="mx-[4rem] flex items-center justify-start"
                  >
                    <img
                      src={partner.src}
                      alt={partner.alt}
                      className="h-10 w-auto object-contain max-w-[160px] rounded-md px-2 py-1.5 opacity-70 grayscale transition-opacity duration-300 hover:opacity-100 md:h-16 md:max-w-[200px] md:px-3 md:py-2 dark:bg-white"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
