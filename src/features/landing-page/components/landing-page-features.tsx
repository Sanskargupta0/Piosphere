import { Server, ArrowRight, Shield, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  AnimatedCard,
  CardBody,
  CardDescription,
  CardTitle,
  CardVisual,
} from './animated-card'
import { Visual1 } from './visual-1'
import { Visual2 } from './visual-2'
import { Visual3 } from './visual-3'

import HyperTextParagraph from './hyper-text-with-decryption'
import { HandWrittenTitle } from './hand-writing-text'
import { CpuArchitecture } from '@/components/ui/cpu-architecture'
import { scrollToSection } from '../lib/smooth-scroll'

export function LandingPageFeatures() {
  const { t } = useTranslation('landing')
  return (
    <section className="relative z-20 py-16 md:py-32" style={{ background: 'linear-gradient(to bottom, var(--muted), var(--background) 40%)' }}>
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-16 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground/60 mb-4">
              <Server className="size-4" />
              {t('features.sectionLabel')}
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl leading-[1.1]">
              {t('features.headline')} <br />
              {t('features.headlineSuffix')}
            </h2>
          </div>
          <div className="max-w-md space-y-6">
            <p className="text-base text-foreground/60 leading-relaxed md:text-lg">
              {t('features.description')}
            </p>
            <Button
              variant="secondary"
              className="group gap-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground"
              asChild
            >
              <a
                href="#bucket"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('bucket')
                }}
              >
                {t('features.cta')}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>

        {/* Animated Product Cards - #products target for the header nav */}
        <div id="products" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 scroll-mt-16">
          <AnimatedCard className="w-full max-w-none">
            <CardVisual className="w-full max-w-none">
              <Visual1 mainColor="#8b5cf6" secondaryColor="#a78bfa" />
            </CardVisual>
            <CardBody>
              <CardTitle>{t('features.pioagentTitle')}</CardTitle>
              <CardDescription>{t('features.pioagentDesc')}</CardDescription>
            </CardBody>
          </AnimatedCard>

          <AnimatedCard className="w-full max-w-none">
            <CardVisual className="w-full max-w-none">
              <Visual2 mainColor="#f97316" secondaryColor="#fb923c" />
            </CardVisual>
            <CardBody>
              <CardTitle>{t('features.piocallTitle')}</CardTitle>
              <CardDescription>{t('features.piocallDesc')}</CardDescription>
            </CardBody>
          </AnimatedCard>

          <AnimatedCard className="w-full max-w-none sm:col-span-2 lg:col-span-1">
            <CardVisual className="w-full max-w-none">
              <Visual3 mainColor="#06b6d4" secondaryColor="#22d3ee" />
            </CardVisual>
            <CardBody>
              <CardTitle>{t('features.piosphereTitle')}</CardTitle>
              <CardDescription>{t('features.piosphereDesc')}</CardDescription>
            </CardBody>
          </AnimatedCard>
        </div>

        {/* Detail Bento Grid */}
        <div className="mt-16 relative">
          <div className="relative z-10 grid grid-cols-6 gap-4">

            {/* 100% Data Sovereignty */}
            <Card className="relative col-span-full flex overflow-hidden lg:col-span-2 bg-background border-border/50">
              <CardContent className="relative m-auto size-fit pt-6">
                <div className="relative flex h-24 w-56 items-center">
                  <HandWrittenTitle
                    className="h-full"
                    title={<span className="block text-5xl font-semibold text-foreground">{t('features.sovereigntyPercentage')}</span>}
                  />
                </div>
                <h2 className="mt-6 text-center text-2xl font-semibold text-foreground">{t('features.sovereigntyTitle')}</h2>
                <p className="text-center text-foreground/60 mt-2 text-sm max-w-[250px] mx-auto">{t('features.sovereigntyDesc')}</p>
              </CardContent>
            </Card>

            {/* Enterprise Security */}
            <Card className="relative col-span-full overflow-hidden lg:col-span-4 bg-background border-border/50">
              <CardContent className="grid pt-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                  <div className="relative flex aspect-square size-12 rounded-full border border-border/50 before:absolute before:-inset-2 before:rounded-full before:border before:border-border/30">
                    <Shield className="m-auto size-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-foreground">{t('features.securityTitle')}</h2>
                    <HyperTextParagraph
                      text={t('features.securityDesc')}
                      highlightWords={t('features.securityHighlightWords', { returnObjects: true }) as string[]}
                      className="text-foreground/60"
                      autoPlay
                    />
                  </div>
                </div>
                <div className="rounded-tl-2xl relative -mb-6 -mr-6 mt-6 h-fit border-l border-t border-border/50 p-6 py-6 sm:ml-6 bg-foreground/5 backdrop-blur-md">
                  <div className="absolute left-3 top-2 flex gap-1">
                    <span className="block size-2 rounded-full border border-border bg-foreground/10"></span>
                    <span className="block size-2 rounded-full border border-border bg-foreground/10"></span>
                    <span className="block size-2 rounded-full border border-border bg-foreground/10"></span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="h-4 w-3/4 rounded bg-primary/20"></div>
                    <div className="h-4 w-1/2 rounded bg-primary/10"></div>
                    <div className="h-4 w-full rounded bg-primary/5"></div>
                    <div className="h-4 w-5/6 rounded bg-primary/5"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Multi-tenant Architecture */}
            <Card className="relative col-span-full overflow-hidden lg:col-span-3 bg-background border-border/50">
              <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                  <div className="relative flex aspect-square size-12 rounded-full border border-border/50 before:absolute before:-inset-2 before:rounded-full before:border before:border-border/30">
                    <Users className="m-auto size-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-foreground">{t('features.multitenantTitle')}</h2>
                    <p className="text-foreground/60">{t('features.multitenantDesc')}</p>
                  </div>
                </div>
                <div className="before:bg-border/50 relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px sm:-my-6 sm:-mr-6">
                  <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                    <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                      <span className="block h-fit rounded border border-border/50 bg-background px-2 py-1 text-xs shadow-sm">{t('features.multitenantLabelAnalytics')}</span>
                      <div className="ring-background size-7 ring-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="size-2 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                      <div className="ring-background size-8 ring-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="size-2.5 rounded-full bg-primary"></div>
                      </div>
                      <span className="block h-fit rounded border border-border/50 bg-background px-2 py-1 text-xs shadow-sm">{t('features.multitenantLabelAgents')}</span>
                    </div>
                    <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                      <span className="block h-fit rounded border border-border/50 bg-background px-2 py-1 text-xs shadow-sm">{t('features.multitenantLabelScale')}</span>
                      <div className="ring-background size-7 ring-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="size-2 rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* On-Premise Deployment */}
            <Card className="relative col-span-full overflow-hidden lg:col-span-3 bg-background border-border/50">
              <CardContent className="grid pt-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                  <div className="relative flex aspect-square size-12 rounded-full border border-border/50 before:absolute before:-inset-2 before:rounded-full before:border before:border-border/30">
                    <Server className="m-auto size-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-foreground">{t('features.onpremTitle')}</h2>
                    <p className="text-foreground/60">{t('features.onpremDesc')}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between align-middle relative mt-6 sm:ml-6 -mb-6 -mr-6 min-h-[160px]">
                  <div className="rounded-tl-2xl relative h-fit border-l border-t border-border/50 p-6 py-6 bg-foreground/5 backdrop-blur-md z-10 w-full mb-12">
                    <div className="absolute left-3 top-2 flex gap-1">
                      <span className="block size-2 rounded-full border border-border bg-foreground/10"></span>
                      <span className="block size-2 rounded-full border border-border bg-foreground/10"></span>
                      <span className="block size-2 rounded-full border border-border bg-foreground/10"></span>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-green-500/60"></div>
                        <div className="h-3 flex-1 rounded bg-primary/15"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-green-500/60"></div>
                        <div className="h-3 w-4/5 rounded bg-primary/10"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-yellow-500/60"></div>
                        <div className="h-3 w-3/5 rounded bg-primary/5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none mb-6 w-[260px] h-[130px] z-0 opacity-80">
                    <CpuArchitecture />
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  )
}
