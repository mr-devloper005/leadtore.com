import { BadgeCheck, Building2, Search, Star } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'
import { editableUi as ui } from '@/editable/layouts/design-contract'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className={ui.page}>
        <section className={`${ui.container} ${ui.sectionY}`}>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <article className={`${ui.panel} p-8 lg:p-12`}>
              <p className={ui.eyebrow}>{pagesContent.about.badge}</p>
              <h1 className={`mt-5 ${ui.h1}`}>About {globalContent.site.name}</h1>
              <p className={`mt-5 max-w-2xl ${ui.lead}`}>{pagesContent.about.description}</p>
              <div className="mt-8 space-y-4">
                {pagesContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={ui.body}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[{ label: 'Search', icon: Search }, { label: 'Compare', icon: Star }, { label: 'Contact', icon: Building2 }].map(({ label, icon: Icon }) => (
                  <div key={label} className={`rounded-2xl border border-[var(--editable-border)] ${ui.tintStrong} p-4 text-sm font-black`}>
                    <Icon className="mb-3 h-5 w-5 text-[#315fe8]" /> {label}
                  </div>
                ))}
              </div>
            </article>

            <aside className="grid content-start gap-5">
              {pagesContent.about.values.map((value) => (
                <div key={value.title} className={`${ui.card} ${ui.cardHover} p-6`}>
                  <BadgeCheck className="h-6 w-6 text-[#315fe8]" />
                  <h2 className={`mt-4 ${ui.h3}`}>{value.title}</h2>
                  <p className={`mt-3 ${ui.body}`}>{value.description}</p>
                </div>
              ))}
              <div className={`${ui.dark} p-6 shadow-[0_18px_52px_rgba(15,35,70,0.12)]`}>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9cc4ff]">Directory desk</p>
                <p className="mt-4 text-base leading-8 text-white/70">
                  Every listing page keeps identity, category, location, and contact routes close together so a shortlist takes minutes, not tabs.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
