'use client'

import { BadgeCheck, Building2, Mail, MapPin, Phone, Search } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
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
      <main className="bg-[var(--editable-page-bg,#f7fbff)] text-[var(--editable-page-text,#07142b)]">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#315fe8]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">{pagesContent.contact.description}</p>

            <div className="mt-8 grid gap-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-3xl border border-[var(--editable-border)] bg-white p-5 shadow-sm">
                  <lane.icon className="h-6 w-6 text-[#315fe8]" />
                  <h2 className="mt-3 text-xl font-black">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{lane.body}</p>
                </div>
              ))}
            </div>

            
          </div>

          <div className="rounded-3xl border border-[var(--editable-border)] bg-white p-5 shadow-[0_18px_52px_rgba(15,35,70,0.10)] sm:p-7">
            <h2 className="text-2xl font-black tracking-tight">{pagesContent.contact.formTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Share the business name, category, location, and the exact change or support request.</p>
            <div className="mt-5">
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
