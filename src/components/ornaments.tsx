export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={`mx-auto h-5 w-56 text-accent ${className}`} aria-hidden fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M0 12h88M152 12h88" />
      <path d="M96 12c6-8 14-8 18-2-4 2-10 2-18 2zm0 0c6 8 14 8 18 2-4-2-10-2-18-2zM144 12c-6-8-14-8-18-2 4 2 10 2 18 2zm0 0c-6 8-14 8-18 2 4-2 10-2 18-2z" />
      <path d="M120 4l6 8-6 8-6-8z" fill="currentColor" fillOpacity=".25" />
      <circle cx="84" cy="12" r="1.5" fill="currentColor" />
      <circle cx="156" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 64 64" className={`absolute h-12 w-12 text-accent sm:h-16 sm:w-16 ${className}`} aria-hidden fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M2 62V14C2 7 7 2 14 2h48" />
      <path d="M8 62V20c0-7 5-12 12-12h42" strokeOpacity=".5" />
      <path d="M14 30c0-9 7-16 16-16M20 40c4-10 10-14 20-14" strokeOpacity=".7" />
      <path d="M22 22c3-5 8-5 10-1-3 2-6 2-10 1zM22 22c-5 3-5 8-1 10 2-3 2-6 1-10z" fill="currentColor" fillOpacity=".2" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}

export function Corners() {
  return (
    <>
      <Corner className="left-3 top-3" />
      <Corner className="right-3 top-3 -scale-x-100" />
      <Corner className="bottom-3 left-3 -scale-y-100" />
      <Corner className="bottom-3 right-3 -scale-100" />
    </>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="mb-12 text-center">
      <p className="eyebrow">{eyebrow}</p>
      <div className="mx-auto mt-4 flex max-w-md items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-accent" />
        <h2 className="font-display text-4xl font-light italic text-foreground sm:text-5xl">{title}</h2>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-accent" />
      </div>
      <Divider className="mt-5" />
    </header>
  );
}
