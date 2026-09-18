import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useId, useState } from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQSectionProps {
  items: FAQItem[]
  title: string
  subtitle?: string
}

export function FAQSection({ items, title, subtitle }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className='w-full px-4 py-16'>
      <div className='mx-auto max-w-4xl'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-12 text-center'
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className='mb-4 inline-flex rounded-full bg-accent/10 p-3'
            aria-hidden='true'
          >
            <HelpCircle className='h-8 w-8 text-muted-foreground' aria-hidden='true' />
          </motion.div>
          <h2 className='mb-4 text-3xl font-bold sm:text-4xl md:text-5xl'>{title}</h2>
          {subtitle ? (
            <p className='text-sm text-foreground/70 sm:text-base md:text-lg'>{subtitle}</p>
          ) : null}
        </motion.div>

        <div className='space-y-4'>
          {items.map((faq, index) => {
            const questionId = `${baseId}-question-${index}`
            const answerId = `${baseId}-answer-${index}`

            return (
              <motion.div
                key={questionId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className='overflow-hidden'>
                  <CardHeader>
                    <motion.button
                      type='button'
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className='flex w-full items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-ring'
                      whileHover={{ x: 4 }}
                      aria-expanded={openIndex === index}
                      aria-controls={answerId}
                      id={questionId}
                    >
                      <span className='text-lg font-semibold'>{faq.question}</span>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        aria-hidden='true'
                      >
                        <ChevronDown className='h-5 w-5 text-foreground/60' />
                      </motion.div>
                    </motion.button>
                  </CardHeader>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        role='region'
                        id={answerId}
                        aria-labelledby={questionId}
                      >
                        <CardContent className='pt-0'>
                          <p className='text-foreground/70'>{faq.answer}</p>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
