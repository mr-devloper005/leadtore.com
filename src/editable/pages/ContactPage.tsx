'use client'

import { BadgeCheck, Building2, Mail, MapPin, Search } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'
import { editableUi as ui } from '@/editable/layouts/design-contract'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: Building2, title: 'Create or update a listing', body: 'Send company details, service categories, website links, profile images, and updates that should appear in the directory.' },
  { icon: BadgeCheck, title: 'Fix business information', body: 'Report inaccurate phone numbers, addresses, descriptions, category placement, or duplicate business profiles.' },
  { icon: Search, title: 'Category and coverage requests', body: 'Ask us to support a new service category, local market, industry lane, or comparison page.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className={ui.page}>
        <section className={`${ui.container} ${ui.sectionY}`}>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className={ui.eyebrow}>{pagesContent.contact.eyebrow}</p>
              <h1 className={`mt-4 max-w-2xl ${ui.h1}`}>{pagesContent.contact.title}</h1>
              <p className={`mt-5 max-w-2xl ${ui.lead}`}>{pagesContent.contact.description}</p>

              <div className="mt-8 grid gap-4">
                {lanes.map((lane) => (
                  <div key={lane.title} className={`${ui.card} ${ui.cardHover} p-5`}>
                    <lane.icon className="h-6 w-6 text-[#315fe8]" />
                    <h2 className={`mt-3 ${ui.h3}`}>{lane.title}</h2>
                    <p className={`mt-2 ${ui.body}`}>{lane.body}</p>
                  </div>
                ))}
              </div>

              <div className={`mt-8 grid gap-4 rounded-3xl border border-[var(--editable-border)] ${ui.tint} p-5 sm:grid-cols-2 sm:p-6`}>
                <div>
                  <p className={`inline-flex items-center gap-2 ${ui.eyebrowQuiet}`}><Mail className="h-4 w-4" /> Directory desk</p>
                  <p className="mt-2 text-sm font-black">{globalContent.site.domain}</p>
                </div>
                <div>
                  <p className={`inline-flex items-center gap-2 ${ui.eyebrowQuiet}`}><MapPin className="h-4 w-4" /> Coverage</p>
                  <p className="mt-2 text-sm font-black">Local and online service listings</p>
                </div>
              </div>
            </div>

            <div className={`${ui.panel} p-5 sm:p-7`}>
              <h2 className={ui.h2}>{pagesContent.contact.formTitle}</h2>
              <p className={`mt-2 ${ui.body}`}>Share the business name, category, location, and the exact change or support request.</p>
              <div className="mt-5">
                <EditableContactLeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
