import { cn } from '@/lib/utils';

export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 h-full w-full bg-background",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, var(--border) 1px, transparent 1px),
          linear-gradient(to bottom, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: '4rem 4rem',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle 600px at 50% 200px, var(--primary), transparent 80%)',
          opacity: 0.15,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, var(--background) 0%, transparent 10%, transparent 90%, var(--background) 100%)'
        }}
      />
    </div>
  );
}
