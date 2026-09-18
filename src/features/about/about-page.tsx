import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

import { MagicText } from '@/components/ui/magic-text'
import { ParallaxScrollFeatureSection } from '@/components/ui/parallax-scroll-feature-section'

const smoothEase = [0.25, 0.1, 0.25, 1] as const

/**
 * About surface: the PioVation story, company facts, the PioSphere
 * stack, principles, partners, and team - on the same legal chrome
 * as contact/privacy/terms. Follows the landing page's token
 * vocabulary (primary accents, hairline borders, muted foreground).
 */
export function AboutPage() {
  const { t } = useTranslation('landing')

  const storyParagraphs = t('about.story.paragraphs', {
    returnObjects: true,
  }) as string[]

  const factRows = t('about.facts.rows', {
    returnObjects: true,
  }) as Array<{ label: string; value: string }>

  const layers = t('about.build.layers', {
    returnObjects: true,
  }) as Array<{ mark: string; title: string; body: string }>

  const principles = t('about.principles.items', {
    returnObjects: true,
  }) as Array<{ title: string; body: string }>

  const partners = t('about.partners.items', {
    returnObjects: true,
  }) as Array<{ name: string; role: string }>

  // Logos live in the repo (same assets the landing-page hero marquee
  // uses), so they are keyed by partner name rather than translated.
  const partnerLogos: Record<string, string> = {
    AMAX: '/images/partners/amax.jpg',
    AMD: '/images/partners/AMD_Logo.png',
    Supermicro: '/images/partners/smc_logo.png',
  }

  return (
    <div className='relative w-full bg-background'>
      {/* Hero */}
      <section className='relative w-full overflow-hidden bg-background py-20'>
        <div className='relative mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12'>
          <div className='mx-auto flex max-w-3xl flex-col items-center gap-4 text-center'>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35, ease: smoothEase }}
              className='text-3xl font-bold tracking-tight text-foreground md:text-5xl'
            >
              {t('about.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4, ease: smoothEase }}
              className='max-w-2xl text-base leading-relaxed text-muted-foreground'
            >
              {t('about.description')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story + facts */}
      <section className='relative w-full py-16'>
        <div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 md:px-8 lg:grid-cols-[1.5fr_1fr] lg:px-12'>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: smoothEase }}
            className='flex flex-col gap-5'
          >
            <p className='text-xs font-semibold tracking-widest text-primary uppercase'>
              {t('about.story.label')}
            </p>
            <h2 className='max-w-xl text-2xl font-semibold tracking-tight text-foreground md:text-3xl'>
              {t('about.story.title')}
            </h2>
            {storyParagraphs.map((paragraph) => (
              <MagicText
                key={paragraph}
                text={paragraph}
                className='max-w-2xl text-base font-normal leading-relaxed text-foreground'
              />
            ))}
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.35, ease: smoothEase }}
            aria-label={t('about.facts.label')}
            className='flex h-fit flex-col gap-0 rounded-2xl border border-border/50 bg-card p-6 sm:p-8'
          >
            {factRows.map(({ label, value }, i) => (
              <div
                key={label}
                className={
                  i === 0
                    ? 'flex items-start justify-between gap-4 py-3'
                    : 'flex items-start justify-between gap-4 border-t border-border/50 py-3'
                }
              >
                <dt className='text-sm text-muted-foreground'>{label}</dt>
                <dd className='max-w-[60%] text-right text-base font-medium text-foreground'>
                  {value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* What we build */}
      <section className='relative w-full py-16'>
        <div className='mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12'>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: smoothEase }}
            className='mb-10 flex max-w-2xl flex-col gap-3'
          >
            <p className='text-xs font-semibold tracking-widest text-primary uppercase'>
              {t('about.build.label')}
            </p>
            <h2 className='text-2xl font-semibold tracking-tight text-foreground md:text-3xl'>
              {t('about.build.title')}
            </h2>
            <p className='text-base leading-relaxed text-muted-foreground'>
              {t('about.build.description')}
            </p>
          </motion.div>

          <ParallaxScrollFeatureSection
            features={layers.map(({ mark, title, body }) => ({
              id: mark,
              title,
              description: body,
            }))}
          />
        </div>
      </section>

      {/* Principles */}
      <section className='relative w-full py-16'>
        <div className='mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12'>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: smoothEase }}
            className='mb-10 flex flex-col gap-3'
          >
            <p className='text-xs font-semibold tracking-widest text-primary uppercase'>
              {t('about.principles.label')}
            </p>
            <h2 className='text-2xl font-semibold tracking-tight text-foreground md:text-3xl'>
              {t('about.principles.title')}
            </h2>
          </motion.div>

          <div className='flex flex-col border-t border-border/50'>
            {principles.map(({ title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.08,
                  ease: smoothEase,
                }}
                className='grid grid-cols-1 gap-2 border-b border-border/50 py-7 md:grid-cols-[260px_1fr] md:gap-8'
              >
                <h3 className='text-lg font-semibold text-primary'>
                  {title}
                </h3>
                <p className='max-w-2xl text-base leading-relaxed text-muted-foreground'>
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className='relative w-full py-16 pb-24'>
        <div className='mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12'>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: smoothEase }}
            className='mb-10 flex flex-col gap-3'
          >
            <p className='text-xs font-semibold tracking-widest text-primary uppercase'>
              {t('about.partners.label')}
            </p>
            <h2 className='text-2xl font-semibold tracking-tight text-foreground md:text-3xl'>
              {t('about.partners.title')}
            </h2>
            <p className='max-w-xl text-base leading-relaxed text-muted-foreground'>
              {t('about.partners.description')}
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25, ease: smoothEase }}
            className='grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-3'
          >
            {partners.map(({ name, role }) => (
              <li
                key={name}
                className='flex flex-col items-center justify-center gap-3 bg-card px-6 py-5 text-center'
              >
                {partnerLogos[name] && (
                  <img
                    src={partnerLogos[name]}
                    alt={name}
                    className='h-10 w-auto max-w-[140px] object-contain'
                  />
                )}
                <span className='text-sm text-muted-foreground'>
                  {role}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

    </div>
  )
}
