import { useTranslation } from 'react-i18next'
import { CounterNumber } from './counter-number'

export function LandingPageStats() {
  const { t } = useTranslation('landing')
  return (
    <section className="relative flex min-h-[60svh] flex-col items-center justify-center overflow-hidden py-24 sm:py-32">
      <div className="z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-center px-6 md:px-8 lg:px-12">
        {/* Section header */}
        <h2 className="mb-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl leading-[1.1]">
          {t('stats.headlinePart1')} <span className="text-primary">{t('stats.headlinePart2')}</span> <br /> {t('stats.headlinePart3')}
        </h2>
        <p className="text-muted-foreground mb-14 max-w-md text-center text-sm md:max-w-lg md:text-base leading-relaxed">
          {t('stats.description')}
        </p>

        {/* Counter grid */}
        <div className="grid flex-wrap justify-center gap-6 space-y-4 text-center md:flex md:space-y-0">
          <div className="space-y-3 px-6">
            <CounterNumber
              className="text-primary"
              value={99}
              suffix=".99%"
              size="xl"
            />
            <p className="text-sm font-medium text-foreground/60">{t('stats.uptimeLabel')}</p>
          </div>
          <div className="space-y-3 md:border-x md:border-border/40 md:px-12">
            <CounterNumber
              className="text-primary"
              value={80}
              suffix="%"
              size="xl"
            />
            <p className="text-sm font-medium text-foreground/60">{t('stats.costSavingsLabel')}</p>
          </div>
          <div className="space-y-3 px-6">
            <CounterNumber
              className="text-primary"
              prefix="<"
              value={200}
              suffix="ms"
              size="xl"
            />
            <p className="text-sm font-medium text-foreground/60">{t('stats.latencyLabel')}</p>
          </div>
        </div>
      </div>

      {/* Background sun glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 110%, var(--primary) 0%, transparent 70%)',
            opacity: 0.33,
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '-30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200%',
            height: '110%',
            backgroundImage:
              'repeating-conic-gradient(from 0deg at 50% 100%, var(--primary) 0deg, var(--primary) 1.5deg, transparent 1.5deg, transparent 12deg)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)',
            filter: 'blur(14px)',
            opacity: 0.23,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-30%',
            left: '50%',
            transform: 'translateX(-50%) rotate(4deg)',
            width: '200%',
            height: '110%',
            backgroundImage:
              'repeating-conic-gradient(from 6deg at 50% 100%, var(--primary) 0deg, var(--primary) 2deg, transparent 2deg, transparent 12deg)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
            filter: 'blur(25px)',
            opacity: 0.16,
          }}
        />

        <div
          className="animate-pulse"
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '300px',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, var(--primary) 0%, transparent 70%)',
            filter: 'blur(80px)',
            opacity: 0.26,
            animationDuration: '4s',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, var(--background) 0%, transparent 40%, transparent 85%, var(--background) 100%)',
          }}
        />
      </div>
    </section>
  )
}
