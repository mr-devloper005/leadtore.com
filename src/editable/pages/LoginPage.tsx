import type { Metadata } from 'next'
import Link from 'next/link'
import { BadgeCheck, Building2, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--editable-page-bg,#fff7ee)] text-[var(--editable-page-text,#2f1d16)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div className="rounded-3xl bg-[#eaf7ff] p-8 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] opacity-55">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-6 max-w-lg text-sm leading-8 opacity-70">{pagesContent.auth.login.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[{ label: 'Search', icon: Search }, { label: 'Verify', icon: BadgeCheck }, { label: 'List', icon: Building2 }].map(({ label, icon: Icon }) => (
                <div key={label} className="rounded-2xl bg-white p-4 text-sm font-black shadow-sm">
                  <Icon className="mb-3 h-5 w-5 text-[#315fe8]" /> {label}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-[var(--editable-border)] bg-white p-6 shadow-[0_18px_52px_rgba(15,35,70,0.10)] sm:p-8">
            <h2 className="text-2xl font-black tracking-[-0.04em]">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm opacity-70">New here? <Link href="/signup" className="font-black underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
