/**
 * Unmint Theme Configuration
 *
 * Customize your documentation's look and feel by modifying this file.
 * All colors, branding, and styling can be adjusted here.
 */

export const siteConfig = {
  // Site metadata
  name: 'PlateCost Docs',
  description: 'Documentation for PlateCost — AI-powered food cost intelligence for restaurants and distributors.',
  url: 'https://docs.platecost.io',

  // Logo configuration
  logo: {
    src: '/logo.svg',
    alt: 'PlateCost',
    width: 40,
    height: 40,
  },

  // Navigation links
  links: {
    github: 'https://github.com/platecost',
    discord: '',
    twitter: '',
    support: 'mailto:support@platecost.io',
  },

  // Footer configuration
  footer: {
    copyright: '© 2026 PlateCost. All rights reserved.',
    links: [
      { label: 'Website', href: 'https://platecost.io' },
      { label: 'Book a Demo', href: 'https://calendly.com/michael-platecost/intro' },
    ],
  },
}

export const themeConfig = {
  // Primary accent color - used for active states, links, highlights
  colors: {
    // Light mode
    light: {
      accent: '#16a34a',        // PlateCost green
      accentForeground: '#ffffff',
      accentMuted: 'rgba(22, 163, 74, 0.1)',
    },
    // Dark mode
    dark: {
      accent: '#4ade80',        // Brighter green for dark backgrounds
      accentForeground: '#0f172a',
      accentMuted: 'rgba(74, 222, 128, 0.1)',
    },
  },

  // Code block styling
  codeBlock: {
    light: {
      background: '#fafafa',
      titleBar: '#f3f4f6',
    },
    dark: {
      background: '#1a1a1f',
      titleBar: '#1f2937',
    },
  },

  // OG Image generation settings
  ogImage: {
    // Gradient background (CSS gradient string)
    gradient: 'linear-gradient(135deg, #ffffff 0%, #dcfce7 50%, #4ade80 100%)',
    // Text colors
    titleColor: '#0f172a',
    sectionColor: '#16a34a',
    // Logo URL (absolute URL required for OG images)
    logoUrl: 'https://platecost.io/static/images/logo-transparent-v3.png',
  },
}

// Export CSS variable values for use in Tailwind
export function getCSSVariables(mode: 'light' | 'dark') {
  const colors = themeConfig.colors[mode]
  return {
    '--accent': colors.accent,
    '--accent-foreground': colors.accentForeground,
    '--accent-muted': colors.accentMuted,
  }
}

/**
 * Get the site URL dynamically
 * Priority: NEXT_PUBLIC_SITE_URL > VERCEL_PROJECT_PRODUCTION_URL > VERCEL_URL > siteConfig.url
 * This allows OG images to work automatically on Vercel without configuration
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  // Use production URL if available (custom domain)
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  // Fallback to deployment URL for preview deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return siteConfig.url
}
