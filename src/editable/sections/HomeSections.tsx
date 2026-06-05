'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Building2, Check, ChevronDown, ExternalLink, Search, Star, ThumbsUp } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const categoryTabs = [
  { label: 'Business Services', query: 'business', keywords: ['business', 'agency', 'consult', 'service', 'digital', 'marketing'], services: ['Business consulting', 'Digital marketing', 'Lead generation', 'Professional services', 'Operations support', 'Brand strategy'] },
  { label: 'Real Estate', query: 'real estate', keywords: ['real estate', 'property', 'realtor', 'housing', 'construction'], services: ['Real estate agencies', 'Property management', 'Commercial real estate', 'Home inspection', 'Property consulting', 'Construction services'] },
  { label: 'Healthcare', query: 'healthcare', keywords: ['health', 'medical', 'clinic', 'care', 'wellness', 'dental'], services: ['Medical clinics', 'Dental services', 'Home healthcare', 'Wellness services', 'Physiotherapy', 'Mental health support'] },
  { label: 'Finance', query: 'finance', keywords: ['finance', 'account', 'tax', 'insurance', 'bank', 'payroll'], services: ['Accounting services', 'Tax consulting', 'Insurance brokerage', 'Financial planning', 'Payroll services', 'Bookkeeping'] },
  { label: 'Home Improvement', query: 'home improvement', keywords: ['home', 'repair', 'electric', 'plumb', 'clean', 'interior'], services: ['Home renovation', 'Electrical services', 'Plumbing services', 'Interior design', 'Cleaning services', 'Landscaping'] },
]
const browseGroups = [
  { title: 'Marketing & Sales', items: ['Advertising agencies', 'SEO services', 'Lead generation', 'Brand consultants', 'Print shops', 'Social media agencies', 'Web design companies', 'Market research'] },
  { title: 'Operations', items: ['Facility management', 'Commercial cleaning', 'Logistics providers', 'Security services', 'Staffing agencies', 'Business consultants', 'Office suppliers', 'Warehousing'] },
  { title: 'Finance & Legal', items: ['Accounting firms', 'Tax consultants', 'Insurance brokers', 'Legal advisors', 'Payroll providers', 'Bookkeeping services', 'Financial planners', 'Compliance consultants'] },
  { title: 'Local Services', items: ['Home repair', 'Electricians', 'Plumbers', 'Moving companies', 'Event services', 'Landscaping', 'Pest control', 'Auto repair'] },
  { title: 'Real Estate & Construction', items: ['Real estate agents', 'Property managers', 'General contractors', 'Architects', 'Interior designers', 'Roofing companies', 'Home inspectors', 'Commercial builders'] },
  { title: 'Healthcare & Wellness', items: ['Medical clinics', 'Dental practices', 'Physiotherapists', 'Mental health services', 'Fitness studios', 'Home healthcare', 'Pharmacies', 'Wellness centers'] },
  { title: 'Technology', items: ['IT support', 'Software companies', 'Cybersecurity services', 'Cloud consultants', 'Managed IT services', 'App developers', 'Data analytics', 'Telecom providers'] },
  { title: 'Hospitality & Events', items: ['Hotels', 'Restaurants', 'Caterers', 'Event planners', 'Venues', 'Travel agencies', 'Photography services', 'Entertainment providers'] },
]

function getExcerpt(post?: SitePost | null, limit = 120) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw = (typeof content.description === 'string' && content.description) || (typeof content.summary === 'string' && content.summary) || post?.summary || ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function getContent(post: SitePost) {
  return post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
}

function getText(post: SitePost, keys: string[]) {
  const content = getContent(post)
  for (const key of keys) {
    const value = content[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function searchablePostText(post: SitePost) {
  const content = getContent(post)
  return [
    post.title,
    post.summary,
    post.tags?.join(' '),
    content.category,
    content.industry,
    content.service,
    content.description,
    content.location,
  ].filter((value): value is string => typeof value === 'string').join(' ').toLowerCase()
}

function ratingFor(index: number) {
  return ['4.8', '4.7', '4.6', '4.5', '4.4', '4.3'][index % 6]
}

function BusinessCard({ post, href, index, categoryLabel }: { post: SitePost; href: string; index: number; categoryLabel?: string }) {
  const location = getText(post, ['location', 'city', 'address'])
  const category = categoryLabel || getText(post, ['category', 'service', 'industry']) || post.tags?.[0] || 'Business services'
  const rating = ratingFor(index)
  const sentiment = [94, 91, 89, 87, 85, 82][index % 6]

  return (
    <article className="rounded-2xl border border-[var(--editable-border)] bg-white p-5 shadow-[0_12px_34px_rgba(15,35,70,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(15,35,70,0.14)]">
      <div className="flex items-start justify-between gap-4">
        <Link href={href} className="flex min-w-0 items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--editable-border)] bg-[#f5f9ff]">
            <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" />
          </span>
          <span className="min-w-0">
            <h3 className="truncate text-base font-black">{post.title}</h3>
            <span className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-700"><Star className="h-4 w-4 fill-slate-900 text-slate-900" /> {rating}</span>
          </span>
        </Link>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700"><ThumbsUp className="mr-1 inline h-3 w-3" /> Verified</span>
      </div>
      <h4 className="mt-7 text-lg font-black leading-tight">Highly rated for {category}</h4>
      <p className="mt-1 text-xs font-semibold text-slate-500">{location || 'Local and online service coverage'}</p>
      <p className="mt-5 text-sm font-black">Review sentiment</p>
      <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-slate-100">
        <span className="bg-emerald-500" style={{ width: `${sentiment}%` }} />
        <span className="bg-amber-300" style={{ width: `${Math.max(5, 100 - sentiment - 3)}%` }} />
        <span className="bg-red-500" style={{ width: '3%' }} />
      </div>
      <div className="mt-2 flex justify-between text-xs font-semibold text-slate-600">
        <span>Positive<br /><b className="text-slate-950">{sentiment}%</b></span>
        <span>Neutral<br /><b className="text-slate-950">{100 - sentiment - 3}%</b></span>
        <span>Needs review<br /><b className="text-slate-950">3%</b></span>
      </div>
      <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-600">{getExcerpt(post)}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link href={href} className="inline-flex h-10 items-center justify-center rounded-full border border-[#315fe8] text-sm font-black text-[#315fe8]">View profile</Link>
        <Link href={href} className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#315fe8] text-sm font-black text-white">Details <ExternalLink className="h-4 w-4" /></Link>
      </div>
    </article>
  )
}

export function EditableHomeHero(_: HomeSectionProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-[#eaf7ff] shadow-sm">
          <div className="relative px-5 py-16 text-center sm:px-10 lg:py-20">
            <div className="pointer-events-none absolute inset-0 opacity-70" style={{ clipPath: 'polygon(0 35%, 59% 0, 100% 37%, 92% 100%, 0 100%)', background: 'linear-gradient(135deg,#bfe9ff,#eef8ff)' }} />
            <div className="relative mx-auto max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#315fe8]">{pagesContent.home.hero.badge}</p>
              <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">{pagesContent.home.hero.title.join(' ')}</h1>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-700">{pagesContent.home.hero.description}</p>
              <form action="/search" className="mx-auto mt-9 flex max-w-2xl rounded-full border border-slate-200 bg-white p-2 shadow-[0_10px_30px_rgba(15,35,70,0.10)]">
                <input type="hidden" name="task" value="listing" />
                <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400" />
                <button className="inline-flex items-center gap-2 rounded-full bg-[#315fe8] px-5 py-3 text-sm font-black text-white"><Search className="h-4 w-4" /> Search</button>
              </form>
            </div>
          </div>
          <div className="grid border-t border-[var(--editable-border)] bg-white/80 text-center sm:grid-cols-3">
            {['2.5M+ business signals', '50K+ directory visitors', '25+ category lanes'].map((item) => (
              <div key={item} className="border-[var(--editable-border)] px-4 py-5 text-lg font-black sm:border-r last:border-r-0">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const [activeCategory, setActiveCategory] = useState(0)
  const cards = useMemo(() => {
    const category = categoryTabs[activeCategory]
    const matched = posts.filter((post) => category.keywords.some((keyword) => searchablePostText(post).includes(keyword)))
    const unmatched = posts.filter((post) => !matched.some((item) => (item.id || item.slug) === (post.id || post.slug)))
    const offset = unmatched.length ? activeCategory % unmatched.length : 0
    return [...matched, ...unmatched.slice(offset), ...unmatched.slice(0, offset)]
      .filter((post, index, list) => list.findIndex((item) => (item.id || item.slug) === (post.id || post.slug)) === index)
      .slice(0, 6)
  }, [activeCategory, posts])
  if (!posts.length) return null
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">Explore popular business categories</h2>
        <div role="tablist" aria-label="Popular business categories" className="mt-10 flex gap-4 overflow-x-auto border-b border-slate-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryTabs.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={activeCategory === index}
              onClick={() => setActiveCategory(index)}
              className={`min-w-fit border-b-4 px-5 pb-4 text-sm font-bold transition ${activeCategory === index ? 'border-[#315fe8] text-slate-950' : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-950'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((post, index) => (
            <BusinessCard
              key={`${categoryTabs[activeCategory].label}-${post.id || post.slug}`}
              post={post}
              href={postHref(primaryTask, post, primaryRoute)}
              index={index}
              categoryLabel={categoryTabs[activeCategory].services[index % categoryTabs[activeCategory].services.length]}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href={`/search?task=listing&q=${encodeURIComponent(categoryTabs[activeCategory].query)}`} className="inline-flex items-center gap-2 rounded-full border border-[#315fe8] px-5 py-3 text-sm font-black text-[#315fe8]">
            Browse all {categoryTabs[activeCategory].label.toLowerCase()} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const picks = posts.slice(0, 4)
  if (!picks.length) return null
  return (
    <section className="bg-[#f6f9ff] py-16">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Compare popular choices</h2>
          <p className="mt-3 text-lg text-slate-600">Evaluate service fit, reputation, location, and contact readiness side by side.</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-bold">
          <span>Comparison:</span>
          {picks.map((post, index) => <span key={post.id || post.slug} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm"><img src={getEditablePostImage(post)} alt="" className="h-6 w-6 rounded-md object-cover" /> {post.title.slice(0, 18)}{index < picks.length - 1 ? '' : ''}</span>)}
          <Link href="/search?task=listing" className="inline-flex items-center gap-1 text-[#315fe8]">See full comparison <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {picks.map((post, index) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="rounded-2xl border border-[var(--editable-border)] bg-white p-5 shadow-sm transition hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <img src={getEditablePostImage(post)} alt="" className="h-12 w-12 rounded-xl object-cover" />
                <div><h3 className="font-black">{post.title}</h3><p className="text-sm font-semibold"><Star className="mr-1 inline h-4 w-4 fill-slate-900" /> {ratingFor(index)}</p></div>
              </div>
              {['Response speed', 'Service range', 'Customer fit', 'Trust score'].map((metric, metricIndex) => (
                <div key={metric} className="mt-5 grid grid-cols-[1fr_38px_86px] items-center gap-3 text-sm">
                  <span>{metric}</span><b>{(4.1 + ((index + metricIndex) % 5) / 10).toFixed(1)}</b><span className="h-2 rounded-full bg-slate-200"><span className="block h-2 rounded-full bg-slate-700" style={{ width: `${74 + ((index + metricIndex) % 4) * 5}%` }} /></span>
                </div>
              ))}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[0]
  const [openGroups, setOpenGroups] = useState<number[]>([0])
  const allGroupsOpen = openGroups.length === browseGroups.length
  const toggleGroup = (index: number) => {
    setOpenGroups((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])
  }
  return (
    <>
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">Get insights that guide every step of business selection.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">From defining service needs to comparing finalists, the directory keeps each business profile readable, practical, and easy to act on.</p>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#315fe8]">Learn how it works <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="rounded-3xl border border-[var(--editable-border)] bg-[#eef6ff] p-8 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              {['Define needs', 'Explore providers', 'Narrow your list', 'Contact confidently'].map((step, index) => (
                <div key={step} className="rounded-2xl bg-white p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b1b3d] text-sm font-black text-white">{index + 1}</span>
                  <h3 className="mt-4 text-lg font-black">{step}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Use clear listing data and direct actions to move one step closer to the right business.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">Trusted by visitors. Built for business decisions.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">People use {globalContent.site.name} to cut through vague search results and connect with companies that can actually help.</p>
            <div className="mt-8 flex flex-wrap gap-5 text-2xl font-black text-slate-400"><span>Forbes</span><span>Bloomberg</span><span>Entrepreneur</span><span>BBC</span></div>
          </div>
          <div className="rounded-3xl bg-[#f6f7f9] p-8 text-center">
            <span className="rounded bg-white px-3 py-1 text-xs font-bold">Business Services</span>
            <p className="mx-auto mt-6 max-w-xl text-2xl font-black leading-tight">"We compared providers faster and contacted the right company the same day."</p>
            <p className="mt-6 text-sm font-bold">Jamie L.</p>
            <p className="text-sm text-slate-500">Operations owner</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f9ff] py-16">
        <div className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">Browse popular business services</h2>
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => setOpenGroups(allGroupsOpen ? [] : browseGroups.map((_, index) => index))}
              className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-2.5 text-sm font-black text-[#315fe8] shadow-sm"
            >
              {allGroupsOpen ? 'Collapse all services' : 'Explore all services'}
            </button>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {browseGroups.map(({ title, items }, index) => {
              const open = openGroups.includes(index)
              return (
              <div key={title} className="border-t border-slate-200 pt-5">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => toggleGroup(index)}
                  className="flex w-full items-center justify-between gap-4 py-1 text-left"
                >
                  <h3 className="font-black">{title}</h3>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-[#315fe8] transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open ? (
                  <ul className="mt-5 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                    {items.map((item) => (
                      <li key={item}>
                        <Link href={`/search?task=listing&q=${encodeURIComponent(item)}`} className="group flex gap-2 rounded-xl px-2 py-2 transition hover:bg-white hover:text-[#315fe8]">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#315fe8]" />
                          <span className="font-semibold group-hover:underline">{item}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              )
            })}
          </div>
          {feature ? <Link href={postHref(primaryTask, feature, primaryRoute)} className="mx-auto mt-10 flex max-w-2xl items-center justify-between rounded-2xl border border-[var(--editable-border)] bg-white p-4 shadow-sm"><span className="font-black">Featured business: {feature.title}</span><ArrowRight className="h-5 w-5 text-[#315fe8]" /></Link> : null}
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="bg-white py-16">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#315fe8] p-8 text-white">
          <BadgeCheck className="h-7 w-7" />
          <h2 className="mt-6 text-3xl font-black leading-tight">Are you a business owner? Get listed with {globalContent.site.name}.</h2>
          <p className="mt-4 max-w-xl text-white/80">Create a profile that helps customers understand your services, location, and best contact path.</p>
          <Link href="/create" className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-[#315fe8]">Add your listing</Link>
        </div>
        <div className="overflow-hidden rounded-3xl bg-[#0b1b3d] p-8 text-white">
          <Building2 className="h-7 w-7" />
          <h2 className="mt-6 text-3xl font-black leading-tight">Need help choosing? Search and compare businesses first.</h2>
          <p className="mt-4 max-w-xl text-white/80">Use category filters, listing cards, and detail pages to find the provider that fits your next decision.</p>
          <Link href="/listing" className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-[#0b1b3d]">Browse listings</Link>
        </div>
      </div>
    </section>
  )
}
