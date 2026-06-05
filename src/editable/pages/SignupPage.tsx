import type { Metadata } from 'next'
import Link from 'next/link'
import { BadgeCheck, Building2, MapPin } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--editable-page-bg,#f7fbff)] text-[var(--editable-page-text,#07142b)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8">
          <div className="rounded-3xl border border-[var(--editable-border)] bg-white p-6 shadow-[0_18px_52px_rgba(15,35,70,0.10)] sm:p-8">
            <h1 className="text-3xl font-black tracking-[-0.05em]">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-slate-600">Already have an account? <Link href="/login" className="font-black text-[#315fe8] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div className="rounded-3xl bg-[#0b1b3d] p-8 text-white sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/60">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-white/72">{pagesContent.auth.signup.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[{ label: 'Company profile', icon: Building2 }, { label: 'Trust signals', icon: BadgeCheck }, { label: 'Location reach', icon: MapPin }].map(({ label, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-black">
                  <Icon className="mb-3 h-5 w-5 text-[#9cc4ff]" /> {label}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
