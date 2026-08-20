import { cn } from '@/lib/utils'
import { editableUi as ui } from '@/editable/layouts/design-contract'

type LoadingStateProps = {
  label?: string
  className?: string
}

function PulseBlock({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-2xl bg-[#e4eefb]', className)} />
}

export function PageLoadingState({ label = 'Loading page', className }: LoadingStateProps) {
  return (
    <div className={cn(ui.container, ui.sectionY, className)} aria-live="polite" aria-busy="true">
      <p className={ui.eyebrowQuiet}>{label}</p>
      <PulseBlock className="mt-5 h-12 w-3/4 max-w-3xl" />
      <PulseBlock className="mt-4 h-5 w-2/3 max-w-2xl" />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-2xl border border-[var(--editable-border)] bg-white p-5 shadow-[0_12px_34px_rgba(15,35,70,0.08)]">
            <PulseBlock className="h-44 w-full" />
            <PulseBlock className="mt-5 h-5 w-4/5" />
            <PulseBlock className="mt-3 h-4 w-3/5" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CardGridLoadingState({ count = 6, className }: LoadingStateProps & { count?: number }) {
  return (
    <div className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', className)} aria-live="polite" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-[var(--editable-border)] bg-white p-4 shadow-[0_12px_34px_rgba(15,35,70,0.08)]">
          <PulseBlock className="h-40 w-full" />
          <PulseBlock className="mt-4 h-5 w-5/6" />
          <PulseBlock className="mt-3 h-4 w-2/3" />
          <PulseBlock className="mt-6 h-9 w-32 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export function DetailLoadingState({ label = 'Loading detail', className }: LoadingStateProps) {
  return (
    <div className={cn(ui.container, ui.sectionY, 'grid gap-8 lg:grid-cols-[0.8fr_1.2fr]', className)} aria-live="polite" aria-busy="true">
      <PulseBlock className="h-80 w-full rounded-3xl" />
      <div>
        <p className={ui.eyebrowQuiet}>{label}</p>
        <PulseBlock className="mt-5 h-12 w-4/5" />
        <PulseBlock className="mt-5 h-4 w-full" />
        <PulseBlock className="mt-3 h-4 w-5/6" />
        <PulseBlock className="mt-3 h-4 w-2/3" />
      </div>
    </div>
  )
}
