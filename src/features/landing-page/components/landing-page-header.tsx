'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MenuToggleIcon } from './menu-toggle-icon'
import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageSwitch } from '@/components/language-switch'
import { useIsMobile } from '@/hooks/use-mobile'
import { createPortal } from 'react-dom'
import { scrollToSection } from '../lib/smooth-scroll'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  type LucideIcon,
  BrainCircuitIcon,
  CloudIcon,
  MicIcon,
  BarChart2Icon,
  ShieldIcon,
  UsersIcon,
  Settings2Icon,
  MailIcon,
} from 'lucide-react'

type LinkItem = {
  title: string
  href: string
  icon: LucideIcon
  description?: string
  badge?: string
}

export function LandingPageHeader() {
  const { t } = useTranslation('landing')
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(10)
  const isMobile = useIsMobile()

  const productLinks: LinkItem[] = React.useMemo(() => [
    {
      title: t('header.products_menu.pioagent'),
      href: '#products',
      description: t('header.products_menu.pioagentDesc'),
      icon: BrainCircuitIcon,
      badge: t('header.products_menu.pioagentBadge'),
    },
    {
      title: t('header.products_menu.piocall'),
      href: '#products',
      description: t('header.products_menu.piocallDesc'),
      icon: MicIcon,
      badge: t('header.products_menu.piocallBadge'),
    },
    {
      title: t('header.products_menu.piosphere'),
      href: '#products',
      description: t('header.products_menu.piosphereDesc'),
      icon: CloudIcon,
      badge: t('header.products_menu.piosphereBadge'),
    },
    {
      title: t('header.products_menu.analytics'),
      href: '#products',
      description: t('header.products_menu.analyticsDesc'),
      icon: BarChart2Icon,
    },
    {
      title: t('header.products_menu.security'),
      href: '#products',
      description: t('header.products_menu.securityDesc'),
      icon: ShieldIcon,
    },
    {
      title: t('header.products_menu.integrations'),
      href: '#products',
      description: t('header.products_menu.integrationsDesc'),
      icon: Settings2Icon,
    },
  ], [t])

  // `overflow: hidden` on <body> alone does not stop touch scrolling on
  // mobile WebKit, so the page behind the open menu kept scrolling. Pin the
  // body in place instead (the body-scroll-lock technique) and restore the
  // offset on close. useLayoutEffect, not useEffect, so the unlock commits
  // synchronously with the tap that closes the menu - before the browser
  // performs the anchor jump of the link that was tapped.
  React.useLayoutEffect(() => {
    if (!open) return

    const scrollY = window.scrollY
    const { body } = document

    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'

    return () => {
      body.style.overflow = ''
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [open])

  // Crossing into desktop width hides the menu via CSS but would leave the
  // body pinned - close it so the page never stays frozen.
  React.useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-200',
        'border-b border-transparent',
        // `open` keeps the solid background while the mobile menu is shown -
        // pinning the body clamps scrollY to 0, which would otherwise flip
        // `scrolled` off and make the header transparent mid-menu.
        (scrolled || open) &&
          'border-border bg-background/80 shadow-sm backdrop-blur-xl supports-backdrop-filter:bg-background/60'
      )}
    >
      <nav className='mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-8 lg:px-12'>

        <a href='/' className='flex items-center gap-2 shrink-0' aria-label='PioVation home'>
          {/* The original /images/pv_*_long.png files were 1563x1563
              SQUARE canvases with the actual 1423x312 horizontal
              wordmark sitting in the middle - i.e. ~80% transparent
              padding. With `w-auto` the browser sized the IMG box as a
              square at whatever h-* we set, and the visible wordmark
              inside scaled down by the same padding ratio - so even at
              h-16 (64px) the actual brand text was only ~14px tall.
              That's why the user kept seeing "small" no matter how
              much we bumped the h-*.
              The _tight assets are the same wordmarks with the alpha-
              transparent padding cropped off (1423x312, 4.5:1 aspect),
              so at h-10 (40px) we get a clean 182x40 wordmark - tall
              enough to read, wide enough to register as the brand.
              Dark-mode swap from earlier PRs unchanged. */}
          <img
            src='/images/pv_green_long_tight.png'
            alt='PioVation'
            className='h-8 w-auto select-none dark:hidden'
            draggable={false}
          />
          <img
            src='/images/pv_white_long_tight.png'
            alt='PioVation'
            className='hidden h-8 w-auto select-none dark:block'
            draggable={false}
          />
        </a>

        {/* Desktop nav */}
        <NavigationMenu className='hidden md:flex'>
          <NavigationMenuList className='gap-1'>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className='h-9 bg-transparent px-3 text-sm font-medium text-foreground/80 hover:bg-accent/10 hover:text-foreground focus:bg-accent/10 focus:text-foreground data-[active]:bg-transparent data-[state=open]:bg-accent/10 data-[state=open]:text-foreground'
                onClick={(e) => e.preventDefault()}
              >
                {t('header.products')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='w-130 p-3'>
                  <div className='grid grid-cols-2 gap-1 mb-3'>
                    {productLinks.map((item) => (
                      <ProductCard key={item.title} {...item} />
                    ))}
                  </div>
                  <div className='border-t pt-2.5 px-1'>
                    <p className='text-xs text-muted-foreground'>
                      {t('header.demoPrompt')}{' '}
                      <a
                        href='/contact'
                        className='font-medium text-foreground hover:text-primary transition-colors'
                      >
                        {t('header.demoLink')}
                      </a>
                    </p>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {[
              { label: t('header.docs'), href: '/docs' },
              { label: t('header.architecture'), href: '/architecture' },
              { label: t('header.about'), href: '/about' },
              { label: t('header.contact'), href: '/contact' },
            ].map(({ label, href }) => (
              <NavigationMenuItem key={label}>
                <NavigationMenuLink asChild>
                  <a
                    href={href}
                    className='inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/10 hover:text-foreground'
                  >
                    {label}
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop right actions */}
        <div className='hidden items-center gap-2 md:flex'>
          <LanguageSwitch />
          <ThemeSwitch />
        </div>

        {/* Mobile right */}
        <div className='flex items-center gap-2 md:hidden'>
          <LanguageSwitch />
          <ThemeSwitch />
          <Button
            size='icon'
            variant='outline'
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls='mobile-menu'
            aria-label='Toggle menu'
          >
            <MenuToggleIcon open={open} className='size-4' duration={300} />
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileMenu open={open}>
        <div className='flex flex-col gap-1'>
          <p className='px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground'>
            {t('header.products')}
          </p>
          {productLinks.map((link) => (
            <MobileNavItem key={link.title} {...link} onNavigate={() => setOpen(false)} />
          ))}

          <div className='my-2 border-t' />

          {[
            { label: t('header.aboutPiovation'), href: '/about', icon: UsersIcon },
            { label: t('header.contact'), href: '/contact', icon: MailIcon },
          ].map((link) => (
            <MobileNavItem
              key={link.label}
              title={link.label}
              href={link.href}
              icon={link.icon}
              onNavigate={() => setOpen(false)}
            />
          ))}
        </div>

      </MobileMenu>
    </header>
  )
}

function ProductCard({ title, href, description, icon: Icon, badge }: LinkItem) {
  return (
    <NavigationMenuLink asChild>
      <a
        href={href}
        onClick={(e) => {
          if (!href.startsWith('#')) return
          e.preventDefault()
          scrollToSection(href.slice(1))
        }}
        className='group flex flex-col gap-2 rounded-lg p-3 transition-colors hover:bg-accent/10 focus:bg-accent/10 focus:outline-none'
      >
        <div className='flex items-center gap-2'>
          <Icon className='size-4 shrink-0 text-primary transition-transform group-hover:scale-110' />
          <span className='text-sm font-semibold text-foreground'>{title}</span>
          {badge && (
            <span className='ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary'>
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className='text-xs leading-relaxed text-muted-foreground'>{description}</p>
        )}
      </a>
    </NavigationMenuLink>
  )
}

function MobileNavItem({
  title,
  href,
  icon: Icon,
  description,
  onNavigate,
}: LinkItem & { onNavigate: () => void }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        // Close the menu for every item; real routes (/contact) then let
        // the default anchor navigation proceed.
        onNavigate()

        if (!href.startsWith('#')) return

        // Hash links: close the menu first, then smooth-scroll. The menu
        // pin teardown restores the pre-menu scroll offset with a
        // window.scrollTo in its cleanup - a scroll started in the same
        // tick would fight it, so give the close a beat to settle first.
        e.preventDefault()
        window.setTimeout(() => scrollToSection(href.slice(1)), 300)
      }}
      className='flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent/10'
    >
      <Icon className='mt-0.5 size-4 shrink-0 text-primary' />
      <div>
        <p className='font-medium text-foreground'>{title}</p>
        {description && (
          <p className='text-xs text-muted-foreground'>{description}</p>
        )}
      </div>
    </a>
  )
}

function MobileMenu({
  open,
  children,
}: {
  open: boolean
  children: React.ReactNode
}) {
  if (!open || typeof window === 'undefined') return null

  return createPortal(
    <div
      id='mobile-menu'
      className={cn(
        'fixed top-16 inset-x-0 bottom-0 z-40 flex flex-col justify-between overflow-y-auto',
        'bg-background/95 backdrop-blur-xl supports-backdrop-filter:bg-background/80',
        'border-t p-4 md:hidden',
        'animate-in fade-in slide-in-from-top-2 duration-200'
      )}
    >
      {children}
    </div>,
    document.body
  )
}

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false)

  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold)
  }, [threshold])

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  React.useEffect(() => {
    onScroll()
  }, [onScroll])

  return scrolled
}

export type { LinkItem }
