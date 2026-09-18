import { cn } from '@/lib/utils'

// Animated CPU die diagram used in the landing-page features card. The
// animation lives in src/styles/index.css (.cpu-architecture +
// .cpu-line-* offset-path keyframes); this component only supplies the
// SVG geometry the paths travel along.
export function CpuArchitecture({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 200 100'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-auto w-full', className)}
      aria-hidden='true'
    >
      <rect
        x='30'
        y='20'
        width='140'
        height='60'
        rx='6'
        className='stroke-border'
        strokeWidth='2'
      />
      <rect
        x='50'
        y='35'
        width='40'
        height='30'
        rx='3'
        className='fill-primary/10 stroke-primary/40'
        strokeWidth='1.5'
      />
      <rect
        x='110'
        y='35'
        width='40'
        height='30'
        rx='3'
        className='fill-primary/10 stroke-primary/40'
        strokeWidth='1.5'
      />
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`top-${i}`}
          x1={45 + i * 16}
          y1='20'
          x2={45 + i * 16}
          y2='12'
          className='stroke-border'
          strokeWidth='2'
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`bottom-${i}`}
          x1={45 + i * 16}
          y1='80'
          x2={45 + i * 16}
          y2='88'
          className='stroke-border'
          strokeWidth='2'
        />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <line
          key={`left-${i}`}
          x1='30'
          y1={28 + i * 15}
          x2='22'
          y2={28 + i * 15}
          className='stroke-border'
          strokeWidth='2'
        />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <line
          key={`right-${i}`}
          x1='170'
          y1={28 + i * 15}
          x2='178'
          y2={28 + i * 15}
          className='stroke-border'
          strokeWidth='2'
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <circle
          key={`pulse-${i}`}
          cx='0'
          cy='0'
          r='2.5'
          className={`cpu-line-${(i % 8) + 1} fill-primary`}
        />
      ))}
    </svg>
  )
}
