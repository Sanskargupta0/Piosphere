import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const smoothEase = [0.25, 0.1, 0.25, 1] as const

/**
 * Architecture surface: how the PioSphere docs experience is built -
 * the stack, the data flow from the PioAgent service to this page, and
 * the tools behind it. Lives on the legal chrome so it reads as part of
 * the site, and follows the about page's token vocabulary.
 */
export function ArchitecturePage() {
  const { t } = useTranslation('landing')

  const layers = t('architecture.layers.items', {
    returnObjects: true,
  }) as Array<{ mark: string; title: string; body: string }>

  const flow = t('architecture.flow.steps', {
    returnObjects: true,
  }) as Array<{ title: string; body: string }>

  const tools = t('architecture.tools.items', {
    returnObjects: true,
  }) as Array<{ name: string; role: string; body: string }>

  return (
    <div className='relative w-full bg-background'>
      {/* Hero */}
      <section className='relative w-full overflow-hidden bg-background py-20'>
        <div className='relative mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12'>
          <div className='mx-auto flex max-w-3xl flex-col items-center gap-4 text-center'>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: smoothEase }}
              className='text-xs font-semibold tracking-widest text-primary uppercase'
            >
              {t('architecture.subtitle')}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: smoothEase }}
              className='text-3xl font-bold tracking-tight text-foreground md:text-5xl'
            >
              {t('architecture.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: smoothEase }}
              className='max-w-2xl text-base leading-relaxed text-muted-foreground'
            >
              {t('architecture.description')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Layers */}
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
              {t('architecture.layers.label')}
            </p>
            <h2 className='text-2xl font-semibold tracking-tight text-foreground md:text-3xl'>
              {t('architecture.layers.title')}
            </h2>
            <p className='text-base leading-relaxed text-muted-foreground'>
              {t('architecture.layers.description')}
            </p>
          </motion.div>

          <div className='flex flex-col border-t border-border/50'>
            {layers.map(({ mark, title, body }, i) => (
              <motion.div
                key={mark}
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
                <h3 className='flex items-baseline gap-3 text-lg font-semibold text-primary'>
                  <span className='font-mono text-xs text-muted-foreground'>
                    {mark}
                  </span>
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

      {/* Data flow */}
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
              {t('architecture.flow.label')}
            </p>
            <h2 className='text-2xl font-semibold tracking-tight text-foreground md:text-3xl'>
              {t('architecture.flow.title')}
            </h2>
            <p className='text-base leading-relaxed text-muted-foreground'>
              {t('architecture.flow.description')}
            </p>
          </motion.div>

          <ol className='grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-5'>
            {flow.map(({ title, body }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.08,
                  ease: smoothEase,
                }}
                className='flex flex-col gap-2 bg-card p-6'
              >
                <span className='font-mono text-xs text-primary'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className='text-base font-semibold text-foreground'>
                  {title}
                </h3>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tools */}
      <section className='relative w-full py-16 pb-24'>
        <div className='mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12'>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: smoothEase }}
            className='mb-10 flex max-w-2xl flex-col gap-3'
          >
            <p className='text-xs font-semibold tracking-widest text-primary uppercase'>
              {t('architecture.tools.label')}
            </p>
            <h2 className='text-2xl font-semibold tracking-tight text-foreground md:text-3xl'>
              {t('architecture.tools.title')}
            </h2>
            <p className='text-base leading-relaxed text-muted-foreground'>
              {t('architecture.tools.description')}
            </p>
          </motion.div>

          <div className='grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-3'>
            {tools.map(({ name, role, body }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.06,
                  ease: smoothEase,
                }}
                className='flex flex-col gap-2 bg-card p-6'
              >
                <div className='flex items-baseline justify-between gap-3'>
                  <h3 className='font-mono text-sm font-semibold text-foreground'>
                    {name}
                  </h3>
                  <span className='text-xs text-muted-foreground'>{role}</span>
                </div>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
