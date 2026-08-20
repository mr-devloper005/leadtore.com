import type { Metadata } from 'next'
import Link from 'next/link'
import { BadgeCheck, Building2, MapPin } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { editableUi as ui } from '@/editable/layouts/design-contract'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className={ui.page}>
        <section className={`${ui.container} ${ui.sectionY}`}>
          <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1fr]">
            <div className={`${ui.panel} p-6 sm:p-8`}>
              <h1 className={ui.h3}>{pagesContent.auth.signup.formTitle}</h1>
              <EditableLocalSignupForm />
              <p className={`mt-5 text-sm font-semibold ${ui.muted}`}>Already have an account? <Link href="/login" className="font-black text-[#315fe8] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
            </div>
            <div className={`${ui.dark} p-8 shadow-[0_18px_52px_rgba(15,35,70,0.12)] sm:p-10`}>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9cc4ff]">{pagesContent.auth.signup.badge}</p>
              <h2 className={`mt-5 max-w-xl ${ui.h1}`}>{pagesContent.auth.signup.title}</h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/70">{pagesContent.auth.signup.description}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[{ label: 'Company profile', icon: Building2 }, { label: 'Trust signals', icon: BadgeCheck }, { label: 'Location reach', icon: MapPin }].map(({ label, icon: Icon }) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-black">
                    <Icon className="mb-3 h-5 w-5 text-[#9cc4ff]" /> {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
