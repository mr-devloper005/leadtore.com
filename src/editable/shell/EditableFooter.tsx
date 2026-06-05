'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight, LogOut } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#ffffff', '--editable-footer-text': 'var(--editable-page-text, #07142b)' } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer style={footerVars} className="border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-[var(--editable-border)] bg-white">
              <img src="/favicon.png?v=20260413" alt={globalContent.site.name} className="h-8 w-9 object-contain" />
            </span>
            <span className="text-xl font-black tracking-tight">{globalContent.site.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">{globalContent.footer.description}</p>
          <Link href="/create" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#315fe8] px-5 py-3 text-sm font-black text-white">
            List your business <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Directory</h3>
          <div className="mt-4 grid gap-2">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#315fe8]">
                {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Company</h3>
          <div className="mt-4 grid gap-2">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ['Search', '/search?task=listing'],
              ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-bold text-slate-600 hover:text-[#315fe8]">{label}</Link>
            ))}
            {session ? (
              <button type="button" onClick={logout} className="inline-flex items-center gap-2 text-left text-sm font-bold text-slate-600 hover:text-[#315fe8]">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--editable-border)] bg-[#f6f9ff] p-5">
          <h3 className="text-sm font-black">Business discovery desk</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">Use the directory to compare providers, verify essentials, and reach a company without digging through noisy pages.</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{globalContent.site.domain}</p>
        </div>
      </div>
      <div className="border-t border-[var(--editable-border)] px-4 py-5 text-center text-xs font-bold text-slate-500">
        © {year} {globalContent.site.name}. All rights reserved.
      </div>
    </footer>
  )
}
