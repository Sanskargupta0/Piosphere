// Circular flag icons for the language switcher (issue #1318). Inline
// SVG rather than emoji -- Windows renders flag emoji as plain letters
// (no flag glyphs in the system font) -- and rather than image files,
// so the trigger paints with zero extra requests and themes cleanly.

type FlagIconProps = {
  className?: string
}

// Shared circular frame: the flag fills a circle via a clipPath so any
// aspect-rio source art stays inside the round trigger button.
function CircularFlag({
  id,
  children,
  className,
}: FlagIconProps & { id: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox='0 0 24 24'
      role='img'
      aria-hidden='true'
      focusable='false'
      className={className}
    >
      <defs>
        <clipPath id={id}>
          <circle cx='12' cy='12' r='11' />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>{children}</g>
      <circle
        cx='12'
        cy='12'
        r='11'
        fill='none'
        stroke='currentColor'
        strokeOpacity='0.25'
        strokeWidth='1'
      />
    </svg>
  )
}

export function GermanFlagIcon({ className }: FlagIconProps) {
  return (
    <CircularFlag id='lang-flag-de' className={className}>
      <rect x='0' y='0' width='24' height='8' fill='#000' />
      <rect x='0' y='8' width='24' height='8' fill='#DD0000' />
      <rect x='0' y='16' width='24' height='8' fill='#FFCE00' />
    </CircularFlag>
  )
}

export function EnglishFlagIcon({ className }: FlagIconProps) {
  return (
    <CircularFlag id='lang-flag-en' className={className}>
      {/* Union Jack */}
      <rect x='0' y='0' width='24' height='24' fill='#012169' />
      <path d='M0 0 L24 24 M24 0 L0 24' stroke='#fff' strokeWidth='5' />
      <path d='M0 0 L24 24 M24 0 L0 24' stroke='#C8102E' strokeWidth='3' />
      <path d='M12 0 V24 M0 12 H24' stroke='#fff' strokeWidth='7' />
      <path d='M12 0 V24 M0 12 H24' stroke='#C8102E' strokeWidth='4' />
    </CircularFlag>
  )
}
