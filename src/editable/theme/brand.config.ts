import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)
const env = process.env

export const slot4BrandConfig = {
  siteName: env.NEXT_PUBLIC_SITE_NAME || env.SITE_NAME || 'Business Directory',
  tagline: env.NEXT_PUBLIC_SITE_TAGLINE || env.SITE_TAGLINE || 'Verified business listing platform',
  domain: env.NEXT_PUBLIC_SITE_DOMAIN || env.SITE_DOMAIN || 'business-directory.local',
  baseUrl: env.NEXT_PUBLIC_SITE_URL || env.SITE_URL || 'https://business-directory.local',
  productKind,
  ogImage: env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  accents:
    productKind === 'visual'
      ? { primary: '#8df0c8', surface: '#07101f' }
      : productKind === 'editorial'
        ? { primary: '#241711', surface: '#fbf6ee' }
        : productKind === 'directory'
          ? { primary: '#0f172a', surface: '#f8fbff' }
          : { primary: '#5b2b3b', surface: '#f7f1ea' },
} as const
