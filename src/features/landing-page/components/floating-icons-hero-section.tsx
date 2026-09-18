import * as React from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { useIsMobile } from '@/hooks/use-mobile';

interface IconProps {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string;
}

export interface FloatingIconsHeroProps {
  title: React.ReactNode;
  subtitle: string;
  ctaText: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  icons: IconProps[];
}

const SMALL_SCREEN_POSITIONS = [
  'top-[5%] left-[5%]',
  'top-[5%] right-[5%]',
  'top-[30%] left-[3%]',
  'top-[30%] right-[3%]',
  'top-[58%] left-[5%]',
  'top-[58%] right-[5%]',
  'bottom-[8%] left-[15%]',
  'bottom-[8%] right-[15%]',
];

const Icon = ({
  mouseX,
  mouseY,
  iconData,
  index,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  iconData: IconProps;
  index: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  // Per-icon float duration, frozen at mount so the animation stays
  // stable across re-renders (Math.random() must not run during render).
  const [floatDuration] = React.useState(() => 5 + Math.random() * 5);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
        );

        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2)
          );
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('absolute', iconData.className)}
    >
      <motion.div
        className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 p-3 rounded-3xl shadow-lg bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-600/80"
        animate={{
          y: [0, -8, 0, 8, 0],
          x: [0, 6, 0, -6, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <iconData.icon className="w-7 h-7 md:w-10 md:h-10 text-foreground" />
      </motion.div>
    </motion.div>
  );
};

const FloatingIconsHero = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & FloatingIconsHeroProps
>(({ className, title, subtitle, ctaText, ctaHref, onCtaClick, icons, ...props }, ref) => {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);
  const isMobile = useIsMobile();

  const VISIBLE_COUNT = 8;
  const [cycleIndex, setCycleIndex] = React.useState(0);

  React.useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % Math.ceil(icons.length / VISIBLE_COUNT));
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, icons.length]);

  const visibleIcons = React.useMemo(() => {
    if (!isMobile) return icons;

    const start = (cycleIndex * VISIBLE_COUNT) % icons.length;
    const batch: IconProps[] = [];
    for (let i = 0; i < VISIBLE_COUNT && i < icons.length; i++) {
      const srcIcon = icons[(start + i) % icons.length];
      batch.push({
        ...srcIcon,
        className: SMALL_SCREEN_POSITIONS[i] || srcIcon.className,
      });
    }
    return batch;
  }, [isMobile, icons, cycleIndex]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn('relative w-full bg-background', className)}
      {...props}
    >
      {/* max-w-7xl column - icons and content both clipped here */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="relative min-h-175 flex items-center justify-center overflow-hidden">

          {/* Floating icons - contained within the constrained column */}
          <div className="absolute inset-0 w-full h-full">
            <AnimatePresence mode="popLayout">
              {visibleIcons.map((iconData, index) => (
                <Icon
                  key={`${iconData.id}-${isMobile ? cycleIndex : 'static'}`}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  iconData={iconData}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-linear-to-b from-foreground to-foreground/70 text-transparent bg-clip-text">
              {title}
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">
              {subtitle}
            </p>
            <div className="mt-10">
              {onCtaClick ? (
                <InteractiveHoverButton
                  text={ctaText}
                  onClick={onCtaClick}
                  className="w-40 py-3 text-base"
                />
              ) : (
                <a href={ctaHref} className="inline-block">
                  <InteractiveHoverButton
                    text={ctaText}
                    className="w-40 py-3 text-base"
                  />
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

FloatingIconsHero.displayName = 'FloatingIconsHero';

export { FloatingIconsHero };
