import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f7fbff',
  '--slot4-page-text': '#07142b',
  '--slot4-panel-bg': '#eef6ff',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#516173',
  '--slot4-soft-muted-text': '#65758a',
  '--slot4-accent': '#315fe8',
  '--slot4-accent-fill': '#315fe8',
  '--slot4-accent-soft': '#dcecff',
  '--slot4-dark-bg': '#0b1b3d',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#dbeafe',
  '--slot4-cream': '#f7fbff',
  '--slot4-warm': '#ffffff',
  '--slot4-lavender': '#edf5ff',
  '--slot4-gray': '#f5f7fb',
  '--slot4-body-gradient': 'linear-gradient(180deg, #edf6ff 0%, #ffffff 34%, #f5f7fb 100%)',
  '--editable-page-bg': '#f7fbff',
  '--editable-page-text': '#07142b',
  '--editable-border': 'rgba(15, 35, 70, 0.12)',
  '--editable-container': '1200px',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-black/[0.06]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_12px_40px_rgba(0,0,0,0.08)]',
  shadowStrong: 'shadow-[0_18px_70px_rgba(0,0,0,0.14)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.62))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[140px] shrink-0 snap-start sm:w-[160px]',
  },
  type: {
    eyebrow: 'text-xs font-black uppercase tracking-[0.22em]',
    heroTitle: 'text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl',
    sectionTitle: 'text-3xl font-black tracking-tight sm:text-4xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-2xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-full ${editablePalette.darkBg} px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90`,
    secondary: `inline-flex items-center justify-center rounded-full border ${editablePalette.border} ${editablePalette.surfaceBg} px-8 py-3.5 text-sm font-semibold ${editablePalette.surfaceText} transition hover:bg-black/[0.03]`,
    accent: `inline-flex items-center justify-center rounded-full ${editablePalette.accentBg} px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90`,
  },
  media: {
    frame: `relative overflow-hidden rounded-xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(0,0,0,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

/**
 * Canonical Leadtore directory theme tokens.
 * Every editable page composes these so layout, radius, type weight,
 * muted text, and button shapes stay identical across the site.
 */
export const editableUi = {
  page: 'bg-[var(--editable-page-bg,#f7fbff)] text-[var(--editable-page-text,#07142b)]',
  container: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
  sectionY: 'py-12 sm:py-14 lg:py-16',
  eyebrow: 'text-xs font-black uppercase tracking-[0.22em] text-[#315fe8]',
  eyebrowQuiet: 'text-xs font-black uppercase tracking-[0.22em] text-slate-500',
  h1: 'text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl',
  h2: 'text-3xl font-black tracking-tight sm:text-4xl',
  h3: 'text-xl font-black tracking-tight',
  lead: 'text-base leading-8 text-slate-600',
  body: 'text-sm leading-7 text-slate-600',
  muted: 'text-slate-600',
  softMuted: 'text-slate-500',
  card: 'rounded-2xl border border-[var(--editable-border)] bg-white shadow-[0_12px_34px_rgba(15,35,70,0.08)]',
  cardHover: 'transition hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(15,35,70,0.14)]',
  panel: 'rounded-3xl border border-[var(--editable-border)] bg-white shadow-[0_18px_52px_rgba(15,35,70,0.08)]',
  panelQuiet: 'rounded-3xl border border-[var(--editable-border)] bg-white shadow-sm',
  tint: 'bg-[#f6f9ff]',
  tintStrong: 'bg-[#eef6ff]',
  dark: 'rounded-3xl bg-[#0b1b3d] text-white',
  btnPrimary: 'inline-flex items-center justify-center gap-2 rounded-full bg-[#315fe8] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5',
  btnSecondary: 'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black transition hover:bg-[#f6f9ff]',
  btnOutlineAccent: 'inline-flex items-center justify-center gap-2 rounded-full border border-[#315fe8] px-5 py-3 text-sm font-black text-[#315fe8] transition hover:bg-[#eef6ff]',
  btnBlock: 'inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#315fe8] px-6 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5',
  field: 'h-12 w-full rounded-2xl border border-[var(--editable-border)] bg-white px-4 text-sm font-bold text-[#07142b] outline-none transition placeholder:text-slate-400 focus:border-[#315fe8] focus:ring-4 focus:ring-[#315fe8]/10',
  chip: 'inline-flex items-center gap-1 rounded-full bg-[#f6f9ff] px-3 py-1 text-xs font-bold text-slate-700',
  badge: 'inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#315fe8]',
  accent: '#315fe8',
  ink: '#0b1b3d',
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense directory browsing when cards become too dense for a single grid.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
