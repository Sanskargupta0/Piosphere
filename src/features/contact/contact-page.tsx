import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GlobeCdn } from '@/components/ui/cobe-globe-cdn'
import { SearchSelect } from '@/components/ui/search-select'
import { APP_CONFIG } from '@/lib/runtime-config'
import { CALLING_CODES } from '@/features/contact/calling-codes'

const smoothEase = [0.25, 0.1, 0.25, 1] as const

const inputClasses =
  'w-full rounded-xl border border-border/60 bg-muted/40 px-4 py-2.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10'

interface ContactFormValues {
  name: string
  company: string
  email: string
  callingCode: string
  phone: string
  message: string
}

const emptyForm: ContactFormValues = {
  name: '',
  company: '',
  email: '',
  callingCode: '',
  phone: '',
  message: '',
}

/**
 * Posts the contact form to the CRM webhook (n8n workflow). The phone
 * number travels split exactly as the workflow expects: callingCode is
 * the selected E.164 prefix ('+49'), phone is the subscriber digits
 * without the prefix.
 */
async function submitContactForm(values: ContactFormValues): Promise<void> {
  const response = await fetch(APP_CONFIG.CRM_CONTACT_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      company: values.company,
      message: values.message,
      callingCode: values.callingCode,
      phone: values.phone,
    }),
  })
  if (!response.ok) {
    throw new Error(`CRM webhook returned ${response.status}`)
  }
}

/**
 * Contact surface: channels and a message form on the left, the
 * platform globe on the right. Follows the landing page's token
 * vocabulary (primary accents, hairline borders, muted foreground)
 * rather than any third-party palette.
 */
export function ContactPage() {
  const { t } = useTranslation('landing')
  const [values, setValues] = useState<ContactFormValues>(emptyForm)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>(
    'idle'
  )

  const channels = [
    {
      icon: Mail,
      label: t('contact.channels.sales.label'),
      href: t('contact.channels.sales.href'),
    },
    {
      icon: ShieldCheck,
      label: t('contact.channels.privacy.label'),
      href: t('contact.channels.privacy.href'),
    },
    {
      icon: MapPin,
      label: t('contact.channels.address.label'),
      href: t('contact.channels.address.href'),
    },
  ]

  const setField =
    (field: keyof ContactFormValues) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    try {
      await submitContactForm(values)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className='relative w-full overflow-hidden bg-background py-20'>
      <div className='relative mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12'>
        <div className='mb-12 flex flex-col items-center gap-4 text-center'>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: smoothEase }}
            className='max-w-md text-base leading-relaxed text-muted-foreground'
          >
            {t('contact.description')}
          </motion.p>
        </div>

        <div className='mx-auto grid max-w-5xl grid-cols-1 items-start gap-10 lg:grid-cols-2'>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: smoothEase }}
            className='flex flex-col gap-6'
          >
            <div className='flex flex-col gap-1'>
              <h3 className='text-xl font-semibold text-foreground'>
                {t('contact.getInTouch')}
              </h3>
              <p className='max-w-xs text-sm leading-relaxed text-muted-foreground'>
                {t('contact.getInTouchBody')}
              </p>
            </div>

            <div className='flex flex-col gap-3'>
              {channels.map(({ icon: Icon, label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.1,
                    ease: smoothEase,
                  }}
                  className='group flex w-fit items-center gap-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground'
                >
                  <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/40 transition-all duration-200 group-hover:border-primary/40 group-hover:bg-primary/10'>
                    <Icon className='h-3.5 w-3.5 text-muted-foreground transition-colors duration-200 group-hover:text-primary' />
                  </div>
                  {label}
                </motion.a>
              ))}
            </div>

            <div className='relative h-52 overflow-hidden'>
              <GlobeCdn
                className='absolute top-0 left-0 aspect-square w-full max-w-full'
                speed={0.003}
              />
              <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background to-transparent' />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.35, ease: smoothEase }}
            className='flex flex-col gap-5 rounded-2xl border border-border/50 bg-card p-6 sm:p-8'
          >
            <div>
              <h3 className='mb-0.5 text-lg font-semibold text-foreground'>
                {t('contact.form.heading')}
              </h3>
              <p className='text-sm text-muted-foreground'>
                {t('contact.form.body')}
              </p>
            </div>

            <div className='h-px w-full bg-border/50' />

            {status === 'sent' ? (
              <p
                role='status'
                className='rounded-xl border border-primary/30 bg-primary/10 px-4 py-6 text-center text-sm font-medium text-primary'
              >
                {t('contact.form.success')}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='flex flex-col gap-2'>
                    <label
                      htmlFor='contact-name'
                      className='text-xs font-semibold tracking-widest text-muted-foreground uppercase'
                    >
                      {t('contact.form.fullName')}
                    </label>
                    <input
                      id='contact-name'
                      type='text'
                      required
                      placeholder={t('contact.form.fullNamePlaceholder')}
                      value={values.name}
                      onChange={setField('name')}
                      className={inputClasses}
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label
                      htmlFor='contact-company'
                      className='text-xs font-semibold tracking-widest text-muted-foreground uppercase'
                    >
                      {t('contact.form.company')}
                    </label>
                    <input
                      id='contact-company'
                      type='text'
                      placeholder={t('contact.form.companyPlaceholder')}
                      value={values.company}
                      onChange={setField('company')}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='contact-email'
                    className='text-xs font-semibold tracking-widest text-muted-foreground uppercase'
                  >
                    {t('contact.form.email')}
                  </label>
                  <input
                    id='contact-email'
                    type='email'
                    required
                    placeholder={t('contact.form.emailPlaceholder')}
                    value={values.email}
                    onChange={setField('email')}
                    className={inputClasses}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='contact-phone'
                    className='text-xs font-semibold tracking-widest text-muted-foreground uppercase'
                  >
                    {t('contact.form.phone')}
                  </label>
                  <div className='flex gap-2'>
                    <div className='w-36 shrink-0'>
                      <SearchSelect
                        id='contact-calling-code'
                        value={values.callingCode}
                        onValueChange={(code) =>
                          setValues((prev) => ({ ...prev, callingCode: code }))
                        }
                        options={CALLING_CODES.map((c) => ({
                          value: c.callingCode,
                          label: `${c.name} (${c.callingCode})`,
                        }))}
                        placeholder={t('contact.form.callingCode')}
                        className='h-11 rounded-xl border-border/60 bg-muted/40 text-sm'
                      />
                    </div>
                    <input
                      id='contact-phone'
                      type='tel'
                      inputMode='tel'
                      // Phone is optional, but a typed number without a
                      // selected calling code would reach the CRM without
                      // its prefix, so require the pair together.
                      required={values.phone.trim().length > 0 || undefined}
                      placeholder={t('contact.form.phonePlaceholder')}
                      value={values.phone}
                      onChange={setField('phone')}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='contact-message'
                    className='text-xs font-semibold tracking-widest text-muted-foreground uppercase'
                  >
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id='contact-message'
                    required
                    rows={4}
                    placeholder={t('contact.form.messagePlaceholder')}
                    value={values.message}
                    onChange={setField('message')}
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p role='alert' className='text-sm text-destructive'>
                    {t('contact.form.error')}
                  </p>
                )}

                <Button
                  type='submit'
                  disabled={status === 'submitting'}
                  className='group h-11 w-fit rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground transition hover:opacity-90'
                >
                  {status === 'submitting'
                    ? t('contact.form.submitting')
                    : t('contact.form.submit')}
                  <ArrowRight className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-1' />
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
