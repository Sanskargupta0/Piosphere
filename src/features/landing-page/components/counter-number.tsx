import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface CounterNumberProps {
  value: number
  prefix?: string
  suffix?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  duration?: number
}

const sizeMap = {
  sm: 'text-2xl font-semibold',
  md: 'text-3xl font-bold',
  lg: 'text-4xl font-bold md:text-5xl',
  xl: 'text-5xl font-bold md:text-6xl lg:text-7xl',
}

export function CounterNumber({
  value,
  prefix = '',
  suffix = '',
  size = 'md',
  className = '',
  duration = 2000,
}: CounterNumberProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const frameRate = 1000 / 60
    const totalFrames = Math.round(duration / frameRate)
    let currentFrame = 0

    const counter = setInterval(() => {
      currentFrame++
      const progress = currentFrame / totalFrames
      const easedProgress = 1 - (1 - progress) ** 3
      const current = Math.round(value * easedProgress)

      setCount(Math.min(current, value))

      if (currentFrame >= totalFrames) {
        setCount(value)
        clearInterval(counter)
      }
    }, frameRate)

    return () => clearInterval(counter)
  }, [hasStarted, value, duration])

  const formatted = count.toLocaleString()

  return (
    <div ref={ref} className={cn(sizeMap[size], 'tabular-nums tracking-tight', className)}>
      {prefix && <span>{prefix}</span>}
      {formatted}
      {suffix && <span className="ml-1 text-[0.5em] font-medium opacity-70">{suffix}</span>}
    </div>
  )
}
