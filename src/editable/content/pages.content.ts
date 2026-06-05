import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Find and compare trusted businesses',
      description: 'Explore verified business listings, compare service providers, and contact the right company faster.',
      openGraphTitle: 'Find and compare trusted businesses',
      openGraphDescription: 'Discover business listings with clear categories, reviews, contact details, and comparison-ready cards.',
      keywords: ['business listing', 'business directory', 'local services', 'company comparison'],
    },
    hero: {
      badge: '+25 years of directory-style business discovery',
      title: ['Find the right business', 'for every service need.'],
      description: 'Explore business listings, compare trusted providers, and reach the companies that match your location, budget, and goals.',
      primaryCta: { label: 'Browse listings', href: '/listing' },
      secondaryCta: { label: 'List your business', href: '/create' },
      searchPlaceholder: 'Search businesses, services, categories, or locations',
      focusLabel: 'Directory',
      featureCardBadge: 'verified listing network',
      featureCardTitle: 'Business profiles stay easy to scan, compare, and contact.',
      featureCardDescription: 'Cards highlight category, reputation, sentiment, and contact actions so visitors can move from search to decision faster.',
    },
    intro: {
      badge: 'Buyer guidance',
      title: 'Built for comparing companies without opening a dozen tabs.',
      paragraphs: [
        'Business buyers need clean facts: what a company does, where it serves, how trusted it feels, and how quickly it can be contacted.',
        'The directory keeps listings, categories, search, and comparison-ready details in one consistent interface so discovery feels practical.',
        'Whether someone starts with a category, a direct search, or a featured listing, they can keep narrowing options without losing context.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Verified-style listing cards with contact, location, and summary cues.',
        'Category browsing for common service and industry needs.',
        'Comparison sections that help visitors shortlist providers.',
        'Lightweight account flow for adding and managing business submissions.',
      ],
      primaryLink: { label: 'Browse businesses', href: '/listing' },
      secondaryLink: { label: 'Search directory', href: '/search?task=listing' },
    },
    cta: {
      badge: 'Start comparing',
      title: 'Choose a business with clearer facts and fewer dead ends.',
      description: 'Move from search to shortlist to contact with a directory experience designed around business listings.',
      primaryCta: { label: 'Browse Listings', href: '/listing' },
      secondaryCta: { label: 'Contact Support', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About the directory',
    title: 'A clearer way to discover and compare businesses.',
    description: `${slot4BrandConfig.siteName} helps visitors find businesses by category, location, service fit, and practical trust signals.`,
    paragraphs: [
      'The directory is designed for people who need useful business information quickly: company summaries, contact routes, locations, service categories, and comparison-friendly cards.',
      'We shape every page around business discovery, so visitors can browse categories, evaluate alternatives, and reach the right provider with less friction.',
      'Businesses get a focused profile surface that makes their services easier to understand and easier to act on.',
    ],
    values: [
      {
        title: 'Verified-style profiles',
        description: 'Listings are presented with identity, category, contact, and confidence cues so visitors can scan them quickly.',
      },
      {
        title: 'Comparison-first browsing',
        description: 'Cards, filters, and detail pages are built to support side-by-side decisions instead of generic browsing.',
      },
      {
        title: 'Direct action paths',
        description: 'Every listing keeps website, phone, email, and map context close to the decision point.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Get help with listings, categories, and business visibility.',
    description: 'Tell us whether you want to list a company, update business details, report inaccurate information, or discuss directory coverage.',
    formTitle: 'Send a directory request',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search business listings, services, locations, and categories across the directory.',
    },
    hero: {
      badge: 'Search the directory',
      title: 'Find businesses by service, category, or location.',
      description: 'Use keywords, categories, and listing types to narrow the directory and compare useful results faster.',
      placeholder: 'Search plumbers, agencies, clinics, finance, real estate...',
    },
    resultsTitle: 'Latest business listings',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit a business listing for the directory.',
    },
    locked: {
      badge: 'Listing access',
      title: 'Login to add or manage a business listing.',
      description: 'Use your account to open the listing workspace and submit company details for the directory.',
    },
    hero: {
      badge: 'Listing workspace',
      title: 'Create a clear business profile.',
      description: 'Add service category, company summary, website, images, and detailed information buyers need before contacting you.',
    },
    formTitle: 'Business listing details',
    submitLabel: 'Submit listing',
    successTitle: 'Listing submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login to manage business listings.',
      badge: 'Business account',
      title: 'Welcome back to your directory workspace.',
      description: 'Login to add listings, manage submissions, and keep your business details ready for discovery.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create an account to submit business listings.',
      badge: 'Business listing access',
      title: 'Create your account and list your business.',
      description: 'Open a simple workspace for submitting listings, saving company details, and helping customers find you.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
