import type { Metadata } from 'next'
import Link from 'next/link'
import { BadgeCheck, Building2, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { editableUi as ui } from '@/editable/layouts/design-contract'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className={ui.page}>
        <section className={`${ui.container} ${ui.sectionY}`}>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.85fr]">
            <div className={`${ui.panelQuiet} p-8 sm:p-10`}>
              <p className={ui.eyebrow}>{pagesContent.auth.login.badge}</p>
              <h1 className={`mt-5 max-w-xl ${ui.h1}`}>{pagesContent.auth.login.title}</h1>
              <p className={`mt-6 max-w-lg ${ui.lead}`}>{pagesContent.auth.login.description}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[{ label: 'Search', icon: Search }, { label: 'Verify', icon: BadgeCheck }, { label: 'List', icon: Building2 }].map(({ label, icon: Icon }) => (
                  <div key={label} className={`rounded-2xl border border-[var(--editable-border)] ${ui.tintStrong} p-4 text-sm font-black`}>
                    <Icon className="mb-3 h-5 w-5 text-[#315fe8]" /> {label}
                  </div>
                ))}
              </div>
            </div>
            <div className={`${ui.panel} p-6 sm:p-8`}>
              <h2 className={ui.h3}>{pagesContent.auth.login.formTitle}</h2>
              <EditableLocalLoginForm />
              <p className={`mt-5 text-sm font-semibold ${ui.muted}`}>New here? <Link href="/signup" className="font-black text-[#315fe8] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
