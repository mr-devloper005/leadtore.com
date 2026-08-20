import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { editableUi as ui } from '@/editable/layouts/design-contract'
import { toExcerpt, toSearchText } from '@/editable/content/html-text'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const compactText = (value: unknown) => toSearchText(value)
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
// Feed summaries may be rich HTML; reduce to text before rendering as React children.
const summaryOf = (post: SitePost) => toExcerpt(post.summary, 220) || toExcerpt(getContent(post).description, 220) || toExcerpt(getContent(post).excerpt, 220)

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 5 === 0

  return (
    <Link href={href} className={`group block overflow-hidden ${ui.card} ${ui.cardHover} ${strong ? 'md:col-span-2' : ''}`}>
      {image ? (
        <div className={`relative overflow-hidden bg-[#eef6ff] ${strong ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,61,0)_45%,rgba(11,27,61,0.60))]" />
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#315fe8]">{taskLabel}</span>
        </div>
      ) : null}
      <div className="p-5 sm:p-6">
        {!image ? <span className="rounded-full bg-[#0b1b3d] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white">{taskLabel}</span> : null}
        <h2 className="mt-4 line-clamp-3 text-2xl font-black leading-tight tracking-tight">{post.title}</h2>
        {summary ? <p className={`mt-4 line-clamp-3 ${ui.body}`}>{summary}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#315fe8]">Open result <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className={`min-h-screen ${ui.page}`}>
        <section className={`${ui.container} ${ui.sectionY}`}>
          <div className={`grid gap-8 ${ui.panel} p-6 md:grid-cols-[0.8fr_1.2fr] lg:p-10`}>
            <div>
              <p className={ui.eyebrow}>{pagesContent.search.hero.badge}</p>
              <h1 className={`mt-5 ${ui.h1}`}>{pagesContent.search.hero.title}</h1>
              <p className={`mt-6 max-w-xl ${ui.lead}`}>{pagesContent.search.hero.description}</p>
            </div>
            <form action="/search" className={`self-end rounded-3xl border border-[var(--editable-border)] ${ui.tint} p-4 sm:p-5`}>
              <input type="hidden" name="master" value="1" />
              <label className="flex h-12 items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-white px-4">
                <Search className="h-5 w-5 shrink-0 text-slate-400" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#07142b] outline-none placeholder:text-slate-400" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex h-12 items-center gap-2 rounded-2xl border border-[var(--editable-border)] bg-white px-4">
                  <Filter className="h-4 w-4 shrink-0 text-slate-400" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#07142b] outline-none placeholder:text-slate-400" />
                </label>
                <select name="task" defaultValue={task} className={ui.field}>
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
              <button className={`mt-3 ${ui.btnBlock}`} type="submit">Search</button>
            </form>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={ui.eyebrowQuiet}>{results.length} results</p>
              <h2 className={`mt-2 ${ui.h2}`}>{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/listing" className={ui.btnSecondary}>Browse listings <ArrowRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-[var(--editable-border)] bg-white p-10 text-center">
              <span className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${ui.tintStrong}`}>
                <Search className="h-6 w-6 text-[#315fe8]" />
              </span>
              <p className="mt-5 text-2xl font-black tracking-tight">No matching posts found.</p>
              <p className={`mx-auto mt-3 max-w-md ${ui.body}`}>Try a different keyword, task type, or category.</p>
              <Link href="/listing" className={`mt-6 ${ui.btnOutlineAccent}`}>Browse all listings</Link>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
