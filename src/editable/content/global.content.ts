import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent reading platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Verified business directory',
    primaryLinks: [
      { label: 'Categories', href: '/listing' },
      { label: 'Compare', href: '/search?task=listing' },
      { label: 'Add business', href: '/create' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Find a business', href: '/listing' },
      secondary: { label: 'List your business', href: '/create' },
    },
  },
  footer: {
    tagline: 'Business discovery without the clutter',
    description: 'Find, compare, and contact businesses with clearer listings, practical trust signals, and direct action paths.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Business listings', href: '/listing' },
          { label: 'Search directory', href: '/search?task=listing' },
          { label: 'Create listing', href: '/create' },
          { label: 'Contact support', href: '/contact' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for useful business discovery and confident local decisions.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Verified',
  },
} as const
