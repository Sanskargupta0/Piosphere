import { Button } from "@/components/ui/button"
import { GlobeCdn, type GlobeCdnProps } from "@/components/ui/cobe-globe-cdn"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface GlobeFeatureSectionProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  ctaText?: string
  onCtaClick?: () => void
  className?: string
  globeProps?: GlobeCdnProps
}

export default function GlobeFeatureSection({
  title,
  subtitle,
  ctaText = "Get Started",
  onCtaClick,
  className,
  globeProps,
}: GlobeFeatureSectionProps) {
  return (
    <section className={cn("relative w-full py-16 md:py-24", className)}>
      {/* Same max-width + gutter pattern used by every other landing section */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">

          {/* Text */}
          <div className="z-10 flex-1 text-left">
            {title ?? (
              <h2 className="text-3xl font-normal text-gray-900 dark:text-white">
                Run AI Agents{" "}
                <span className="text-primary">Everywhere</span>
              </h2>
            )}
            {subtitle ?? null}
            <Button
              onClick={onCtaClick}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition hover:opacity-80"
            >
              {ctaText} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Globe - no clipping so circular edges render cleanly */}
          <div className="w-full max-w-sm shrink-0 mx-auto md:mx-0 md:max-w-md lg:max-w-lg">
            <GlobeCdn {...globeProps} />
          </div>

        </div>
      </div>
    </section>
  )
}
