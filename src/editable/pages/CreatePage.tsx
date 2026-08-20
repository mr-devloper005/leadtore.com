'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { editableUi as ui } from '@/editable/layouts/design-contract'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'rounded-2xl border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-bold text-[#07142b] outline-none transition placeholder:text-slate-400 focus:border-[#315fe8] focus:ring-4 focus:ring-[#315fe8]/10'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className={`min-h-screen ${ui.page}`}>
          <section className={`${ui.container} ${ui.sectionY}`}>
            <div className={`grid gap-8 ${ui.panel} p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10`}>
              <div className={`flex h-full min-h-72 items-center justify-center ${ui.dark}`}>
                <Lock className="h-20 w-20 text-[#9cc4ff]" />
              </div>
              <div className="self-center">
                <p className={ui.eyebrow}>{pagesContent.create.locked.badge}</p>
                <h1 className={`mt-5 ${ui.h1}`}>{pagesContent.create.locked.title}</h1>
                <p className={`mt-6 max-w-xl ${ui.lead}`}>{pagesContent.create.locked.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/login" className={ui.btnPrimary}>Login <ArrowRight className="h-4 w-4" /></Link>
                  <Link href="/signup" className={ui.btnSecondary}>Sign up</Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className={`min-h-screen ${ui.page}`}>
        <section className={`${ui.container} ${ui.sectionY}`}>
          <div className={`grid gap-8 ${ui.panel} p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-10`}>
            <aside>
              <p className={ui.eyebrow}>{pagesContent.create.hero.badge}</p>
              <h1 className={`mt-5 ${ui.h1}`}>{pagesContent.create.hero.title}</h1>
              <p className={`mt-6 max-w-xl ${ui.lead}`}>{pagesContent.create.hero.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`rounded-2xl border p-4 text-left transition ${active ? 'border-[#315fe8] bg-[#0b1b3d] text-white shadow-[0_12px_34px_rgba(15,35,70,0.18)]' : 'border-[var(--editable-border)] bg-white hover:-translate-y-0.5 hover:border-[#315fe8]'}`}>
                      <Icon className={`h-5 w-5 ${active ? 'text-[#9cc4ff]' : 'text-[#315fe8]'}`} />
                      <span className="mt-3 block text-sm font-black">{item.label}</span>
                      <span className={`mt-1 block text-xs font-semibold ${active ? 'text-white/70' : 'text-slate-500'}`}>{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <form onSubmit={submit} className={`rounded-3xl border border-[var(--editable-border)] ${ui.tint} p-5 sm:p-7`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className={ui.eyebrowQuiet}>Create {activeTask?.label || 'business listing'}</p>
                  <h2 className={`mt-1 ${ui.h2}`}>{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#315fe8]">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Business name" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Service category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Business website URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Logo or featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short business summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Services, locations served, hours, pricing notes, contact details, and trust highlights" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className={`mt-5 ${ui.btnBlock}`}>
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
