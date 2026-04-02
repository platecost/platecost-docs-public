# PlateCost Docs

Public-facing documentation for [PlateCost](https://platecost.io) — AI-powered food cost intelligence for restaurants and distributors.

**Live site:** https://docs.platecost.io

## About

This repo contains the source for PlateCost's public documentation site. It covers platform guides for restaurants and distributors, feature documentation (invoice processing, recipe costing, vendor comparison), API reference, and FAQ.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16 with App Router
- **Docs engine:** [Fumadocs](https://fumadocs.vercel.app) (MDX processing, search, content management)
- **Scaffolding:** [Unmint](https://github.com/gregce/unmint) (open-source Mintlify alternative)
- **Styling:** Tailwind CSS 4
- **Deployment:** Docker (standalone Next.js) on AWS ECS Fargate behind ALB

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

The site runs at http://localhost:3000 (or the next available port).

## Content Authoring

### Adding pages

Create MDX files in `content/docs/`:

```mdx
---
title: Page Title
description: A short description for SEO and search
---

Your content here. Supports all standard MDX components.
```

### Navigation

Edit `content/docs/meta.json` to control sidebar ordering and section groupings:

```json
{
  "title": "Documentation",
  "pages": [
    "index",
    "quickstart",
    "---Section Name---",
    "page-slug"
  ]
}
```

Use `"---Section Name---"` to create section dividers in the sidebar.

### Available components

The following MDX components are available out of the box:

- `<Card>` / `<CardGroup>` — linked cards with optional icons
- `<Steps>` / `<Step>` — numbered step-by-step guides
- `<Tip>`, `<Info>`, `<Warning>`, `<Note>` — callout boxes
- `<Tabs>` / `<Tab>` — tabbed content sections

### Theme configuration

Branding, colors, links, and footer are configured in `lib/theme-config.ts`.

## Project Structure

```
platecost-docs-public/
├── app/                          # Next.js app directory
│   ├── api/
│   │   ├── health/               # Health check endpoint (/api/health)
│   │   ├── og/                   # Dynamic OG image generation
│   │   └── search/               # Built-in search API
│   └── docs/                     # Documentation routes
├── content/
│   └── docs/                     # MDX documentation files
│       ├── meta.json             # Navigation structure
│       ├── index.mdx             # Home page
│       ├── quickstart.mdx        # Quick start guide
│       ├── restaurants.mdx       # Restaurant platform guide
│       ├── distributors.mdx      # Distributor platform guide
│       ├── invoices.mdx          # Invoice processing docs
│       ├── recipes.mdx           # Recipe costing docs
│       ├── api.mdx               # API reference
│       └── faq.mdx               # FAQ
├── lib/
│   └── theme-config.ts           # Site branding and theme
├── public/                       # Static assets (logos, images)
├── Dockerfile                    # Multi-stage Node 20 build
└── .github/workflows/deploy.yml  # CI/CD pipeline
```

## Deployment

Pushes to `main` trigger automatic deployment via GitHub Actions:

1. **Build** — Docker image built and pushed to ECR (`platecost-docs-public`)
2. **Deploy** — ECS service (`docs-public`) updated with new image
3. **Verify** — Health check confirms running task count matches desired

Manual deploy: `gh workflow run deploy.yml --repo platecost/platecost-docs-public -f environment=prod`

The Docker image uses Next.js standalone output on port 3002, served by the built-in Node.js server.

## Access Control

The docs site is IP-restricted via an ALB listener rule with a `source_ip` condition. Only traffic from allowed CIDRs reaches the service; all other requests fall through to the ALB's default 404 response.

To update the allowed IPs, modify `docs_public_allowed_cidrs` in the infra repo:
- **Prod:** `platecost-infra/environments/prod/ecs/terragrunt.hcl`
- **Dev:** `platecost-infra/environments/dev/ecs/terragrunt.hcl`

To open to the public, set `docs_public_allowed_cidrs = ["0.0.0.0/0"]`.
