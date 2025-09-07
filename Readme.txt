CyberBiz Clinic Ltd. — Website v0.3

Project README

1) Overview

This repository contains the source for the CyberBiz Clinic Ltd. public website, release v0.3. The site communicates our mission, products, units, governance, and policies with a focus on performance, accessibility, and credibility.

Company: CyberBiz Clinic Ltd.

Company Number (Sierra Leone): SL070525CYBER25261

Contact:

Address: Koidu City Library, 37 Council Road, Koidu City, Sierra Leone

Email: info.cbc.sl@gmail.com

Phone: +232-72-282-292

Core priorities featured:

LifeSync, 2) CleanUp, 3) V-Hub

2) What’s in v0.3 (Changelog)

Content & Structure

Added/updated pages and sections:

About/Story with accurate timeline: founder took office (2022), company formed (2023), incorporation (2025).

Board of Directors: finalized list with independent, non-executive governance retained (CEO is the only Executive Director).

Products: LifeSync, CleanUp, V-Hub (LINGENIUM intentionally excluded from product listings).

Units: clarified scopes.

S.I.A = Cybersecurity, Intelligence & A.I.

S.A.A (Sierra Agentic Agency) = agents/workflows/automations. Any “automation” references were removed from S.I.A and aligned under S.A.A.

Policies: Privacy Policy, Terms of Use, Cookies.

Contact: verified address, email, and phone.

Introduced Aya digital guide welcome line (default):
“Hi👋, I’m Aya — your digital guide from CyberBiz Clinic Ltd. I’m here to help you explore our services, products, and vision.”

Navigation & UX

Active state fix for nav on subpages; consistent highlighting across sections.

Deep link anchor for Board: #board uses an offset anchor to prevent overlap with fixed headers.

Performance

Single-load Swiper: eliminated duplicate inits and redundant script tags to prevent carousels from re-instantiating and causing jank.

Asset hygiene: removed unused CSS/JS; consolidated and minified bundles where applicable.

Images: batch-compressed; standardized use of WebP (including favicon.webp); ensured loading="lazy" where appropriate.

Defer/async: non-critical scripts moved to defer/async; long-running logic guarded behind DOMContentLoaded or idle callbacks where safe.

AOS usage: throttled animations and cautious delays to avoid layout thrash.

Accessibility

Landmark roles and semantic HTML verified on major templates.

Alt text pass for content images; focus styles improved; skip-to-content supported.

Color contrast checked against WCAG AA (spot fixes included).

SEO & Trust

Title/meta hygiene; Open Graph & basic Twitter Card tags added.

Canonical links and robots/sitemap expectations documented (see Build/Deploy).

Organization and product copy tuned to emphasize user benefit and social impact.

Company number and governance details surfaced for credibility.

Language & Terminology

Company name standardized to “CyberBiz Clinic Ltd.” across copy.

In customer-facing materials, the term “deposit” is preferred over “payment” (applies where relevant to public copy and invoices).

3) Current Information Architecture (IA)

Folders and filenames may differ in your repo; use this as a reference baseline.

/

index.html — Home

about/ — Story (2022→2025 timeline), leadership context

board/ or team/ — Board of Directors (with #board anchor)

products/ — LifeSync, CleanUp, V-Hub landing/sections

units/ — S.A.A, S.I.A, DigCizen, EmpHub, SaniTech

policies/ — Privacy Policy, Terms of Use, Cookies

contact/ — Contact details + map/form (if any)

/assets/

css/ — minified site styles

js/ — main.js, swiper.*.js, AOS init, utilities (single-init patterns)

img/ — optimized WebP, logos, board headshots

fonts/ — licensed webfonts (if used)

4) Governance Snapshot (Public Copy Source of Truth)

Board of Directors (Independent; CEO is the only Executive Director)

Archie K. Deen — Chairperson & Non-Executive Director, Education & Global Partnerships

Sulaiman Ndamisa — Founder, Chief Executive Officer & Executive Director

Philip Komba Ehkunfan — Non-Executive Director, Finance & Audit

Mohamed “Astro” Alpha Bah — Non-Executive Director, Technology Strategy & Innovation

Mayor Komba Sam — Non-Executive Director, Public Affairs & Strategic Partnerships

Annie Frederique — Non-Executive Director, Inclusive Education & Community Impact

Charles Roy Yawor — Non-Executive Director, People & Organizational Development

Mohamed Yayah Kanu — Non-Executive Director, Legal & Governance

Alhaji Pablo — Non-Executive Director & Board Secretary

Product Priorities (reflected across pages)

LifeSync — healthcare access, queue reduction, appointment routing (smartphone + non-smartphone), AI recommendations for both patients and medical personnel.

CleanUp — organized household waste transport via tricycles; ecosystem for residents, operators, dump sites, and government partners.

V-Hub — led by EmpHub; skills, employment, and digital enablement.

5) Front-End Notes (v0.3 Baseline)

Swiper

Ensure one initialization per carousel container.

Avoid multiple script includes; guard init behind DOMContentLoaded.

Destroy/re-init only on intentional breakpoint changes; otherwise persist.

AOS

Keep animations subtle and non-blocking.

Use limited delays (data-aos-delay) and consistent easing to prevent layout shift.

Images

Prefer WebP; retain fallbacks only where needed.

Apply loading="lazy" to non-critical images.

Keep aspect ratios consistent (CSS aspect-ratio or wrappers).

Scripts & Styles

Use defer for first-party JS that touches the DOM after parse; async for isolated third-party JS.

Consolidate and minify CSS/JS; purge unused selectors if a pipeline exists.

Anchors & Offset

For sections navigated via hash (e.g., #board), use an offset anchor (spacer or CSS scroll-margin-top) to account for fixed headers.

6) Accessibility Checklist (kept in CI/PR review)

Semantic structure: header, nav, main, footer, appropriate headings (one h1 per page).

All meaningful images include alt; decorative images use empty alt.

Keyboard navigation: visible focus, no keyboard traps, skip link present.

Color contrast ≥ WCAG AA for text/icons.

Form labels and aria-* attributes where applicable.

7) SEO & Structured Data

Unique <title> + descriptive <meta name="description"> per page.

Open Graph: og:title, og:description, og:image (WebP + fallback if required), og:type, og:url.

Twitter Card: summary_large_image where useful.

Canonical URLs per page; robots.txt and sitemap.xml generated at deploy.

Organization/Product structured data (JSON-LD) can be added in future for richer snippets.

8) Security & Privacy

Policies live: Privacy Policy, Terms of Use, Cookies.

Cookie banner/config present when tracking or third-party embeds exist.

Recommended (documented for infra):

Strict CSP (block inline except hashed/nonce’d as needed).

SRI on CDN scripts/styles.

HTTPS only with HSTS.

Minimal third-party scripts; audit quarterly.

9) Local Development

This project is a static site. You can open index.html directly or serve locally.

Option A — Quick preview

# Using any static server you prefer:
npx serve .         # or
python -m http.server 8080


Option B — With Node toolchain (if present in repo)

# Install
npm install

# Start dev server (if configured)
npm run dev

# Build/clean
npm run build
npm run clean

# Lint/format (if configured)
npm run lint
npm run format

10) Build & Deployment

Build output: static assets (HTML/CSS/JS/WebP).

Minification: CSS/JS minified; images pre-optimized.

Sitemaps/robots: generated or maintained at the root during deploy.

Cache strategy: long-cache hashed assets; HTML served no-cache (recommended).

CI hooks (if configured): run link check, HTML validation, and basic Lighthouse budget.

11) Content Principles (for future edits)

Voice: clear, forward-looking, user-benefit first.

Naming: always “CyberBiz Clinic Ltd.”

Impact focus: emphasize how our work unlocks value for individuals and communities (especially for LifeSync and CleanUp).

Product scope hygiene:

S.I.A (Cybersecurity, Intelligence & A.I) — no automation claims.

S.A.A (agents/workflows/automations) — automation lives here.

Timeline accuracy: 2022 (founder took office) → 2023 (company formed) → 2025 (incorporated).

12) Known Issues / Watch-List

A few legacy images may still need upscaling or re-cropping for consistent aspect ratios.

Continue monitoring Swiper instances on newly added pages to prevent re-init.

If new third-party widgets are added, re-evaluate CSP and performance budgets.

Validate contrast for any new brand colors or backgrounds.

13) Roadmap (v0.4 Targets)

Lighthouse targets: Perf ≥ 90, SEO ≥ 95, A11y ≥ 95 on key pages.

JSON-LD for Organization and Products.

Expand Aya’s guided prompts and deep links into key sections.

i18n groundwork (content keys + copy extraction) if/when multilingual becomes a priority.

Replace any remaining raster icons with SVG; audit icon set for consistency.

Automated image pipeline (WebP/AVIF generation) integrated into builds.

14) Contributing

Use feature branches and concise PRs.

Keep changes atomic: content vs. layout vs. scripts.

Include screenshots (desktop + mobile) for visible changes.

Run local checks (lint/format, link validation) before opening PR.

15) License & Credits

© CyberBiz Clinic Ltd. All rights reserved.

Libraries used may include Swiper and AOS (see /assets/js/ or CDN includes in templates). Observe each library’s license.

16) Quick Reference

Company Number: SL070525CYBER25261

Name: CyberBiz Clinic Ltd. (always include “Ltd.”)

Priorities: LifeSync → CleanUp → V-Hub

Aya default greeting: “Hi👋, I’m Aya — your digital guide from CyberBiz Clinic Ltd. I’m here to help you explore our services, products, and vision.”

Board: finalized, independent; CEO is the only Executive Director.

S.I.A vs S.A.A scopes clarified (no automation under S.I.A).

Policies live: Privacy, Terms, Cookies.

v0.3 is complete.
If a detail in this README diverges from the repo, update this file in the same PR as the change. Keep the site fast, accessible, and clear.