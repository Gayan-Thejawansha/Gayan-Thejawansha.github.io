# Portfolio Optimization Implementation Plan

## Objective

Rebuild the portfolio into a secure, elegant, responsive, and maintainable
GitHub Pages site that presents Gayan Shanaka Thejawansha as a senior
engineering and information-security professional. Deliver a visually rich
portfolio for people and a separate, plain, text-first CV for applicant
tracking systems (ATS).

## Guiding decisions

- Keep the deployed site static and compatible with GitHub Pages.
- Use a lightweight build step rather than a client-rendered application.
  Important portfolio and CV content must exist in the generated HTML.
- Keep one authoritative profile data file and generate repeated content from
  it where practical.
- Lead with verified outcomes, responsibilities, and technologies. Do not
  invent career metrics.
- Use the confirmed hybrid public position—Lead Software Engineer and
  Information Security Manager—to reflect the responsibilities currently held.
- Publish the confirmed outcomes: 5x merchant catalogue throughput, 70% lower
  feed-processing latency, and 17+ critical infrastructure risks identified and
  remediated.
- Publish one combined management-systems auditor credential covering ISO
  9001:2015 and ISO/IEC 27001:2022 according to ISO 19011:2018. Do not present
  ISO 50001 as a personal certification.
- Attribute the supplied auditor certificate to its verified issuer, T-CERT
  SYSTEM Academy. Add a TÜV NORD identity only if a separate supporting
  credential is supplied.
- Do not rewrite or force-push Git history until credential rotation and the
  destructive history-cleanup operation are explicitly confirmed.

## Phase 0: Security and repository stabilization

### Work

- Revoke or rotate all exposed SMTP, OAuth, API, and recovery credentials.
- Remove credential files, recovery codes, security reports, SMTP passwords,
  and credential examples from the current repository.
- Remove PHPMailer, SMTPJS, and PHP contact-form code that cannot run securely
  on GitHub Pages.
- Replace the contact form with an accessible direct-contact experience that
  contains no browser-side secret.
- Add `.gitignore`, `.gitattributes`, a secret-scanning configuration, and a
  security runbook.
- After rotation is confirmed, remove secrets from all branches and tags with
  `git filter-repo`, scan a fresh clone, and coordinate a force-push.

### Acceptance criteria

- No active secret or recovery credential exists in the current tree.
- A repository secret scan returns no verified secret.
- The public contact experience works without PHP or embedded credentials.
- Line endings are stable and future commits do not contain repository-wide
  CRLF/LF churn.

## Phase 1: Positioning and content

### Work

- Replace generic “hard-working / fast learner” language with a concise senior
  professional value proposition.
- Correct conflicting experience claims (`3+`, `10+`, and the actual timeline).
- Remove age, birthday, freelance status, motivational “Goals,” and unrelated
  social profiles.
- Remove public referee phone/email details. Use “References available on
  request” or consented recommendations instead.
- Standardize role names, locations, dates, capitalization, and technology
  names.
- Group the two Delupe responsibilities clearly so overlapping dates are not
  mistaken for duplicate employment.
- Create a broad, impact-oriented work section covering:
  - commerce/ad-tech catalogue and reporting pipelines;
  - telecom platform integration and modernization;
  - information-security governance and technical controls;
  - hands-on technical leadership and delivery systems.
- Correct the copied ToolsEd project description and remove placeholder links.
- Include all six earlier projects in an accessible, automatically rotating
  ribbon that presents two projects per view; clearly label projects without
  public links.
- Keep role-specific outcomes embedded in the relevant role narrative rather
  than presenting them as a separate site-wide statistic strip.
- Record all reusable content in `data/profile.json`.

### Confirmed decisions

- Equal hybrid positioning across technical leadership and information
  security.
- Publishable outcomes of 5x throughput, 70% lower feed-processing latency, and
  17+ critical risks identified and fixed.
- The supplied certificate is one combined credential rather than separate ISO
  certificates.

### Information still useful

- Team size, traffic/data scale, uptime, deployment frequency, incident
  reduction, audit outcomes, and other measurable results that may be shared.
- A separate TÜV NORD credential or approved logo asset, if one exists.
- Consent status for any public recommendation or reference.

### Acceptance criteria

- One consistent experience figure and professional title appears everywhere.
- Every recent role includes outcome-led bullets with no unverified claims.
- No copied, placeholder, or contradictory content remains.

## Phase 2: Visual and responsive redesign

### Information architecture

1. Hero and primary actions
2. Selected impact
3. Experience
4. Technical and security capabilities
5. Case studies
6. Credentials and education
7. About
8. Contact

### Visual direction

- A restrained navy/slate, cobalt/teal, and warm neutral palette.
- A cleaner futuristic hero with a technical grid, subtle glow, modern sans
  typography, and a clear Engineer / Lead / Security operating model.
- Strong editorial typography below the hero, generous but controlled
  whitespace, consistent radii, borders, shadows, and spacing.
- A text-led or professionally photographed hero; no washed-out full-screen
  casual background.
- A compact sticky header instead of the expanding icon rail.
- Linked employer logos in experience and verified institution identities in
  credentials and education.
- Blend organization identities directly into their section backgrounds
  without logo cards or visible white containers.
- A complete public contact directory covering both emails, UAE phone,
  WhatsApp, LinkedIn, GitHub, Facebook, Instagram, and Microsoft Teams using
  the confirmed `gthejawansha2@outlook.com` account.
- Recognizable contact-channel icons and the optimized engineering portrait in
  the About section.
- Capability tags and evidence instead of arbitrary skill percentages.
- Subtle motion that respects `prefers-reduced-motion`.

### Acceptance criteria

- No horizontal overflow at 320, 390, 768, 1024, and 1440 CSS pixels.
- Primary actions are visible without scrolling on common desktop and mobile
  viewports.
- Navigation and content are usable with keyboard, touch, and screen readers.
- The visual system remains coherent without relying on animation.

## Phase 3: ATS-friendly CV

### Deliverables

- A master data set containing all verified career material.
- A static, semantic HTML CV.
- A text-based printable PDF with a stable filename.
- When content is confirmed, two targeted variants:
  - Lead Software Engineer / Tech Lead;
  - Information Security Manager / technical GRC.

### CV rules

- Single column; no content-bearing tables, sidebars, photos, icons, charts, or
  skill bars.
- Plain-text name, target title, email, phone, location, portfolio, LinkedIn,
  and GitHub.
- Standard headings: Professional Summary, Core Competencies, Professional
  Experience, Selected Projects, Certifications, and Education.
- Consistent `MMM YYYY` dates.
- Four to six achievement bullets for recent roles and fewer for older roles.
- Bullet structure: action + scope + technology + verified result.
- Maximum two pages per targeted version.

### Acceptance criteria

- The HTML contains the CV text without requiring JavaScript.
- Text extraction returns the name, title, employers, dates, skills, and
  achievements in reading order.
- The print/PDF version does not clip, overlap, or split headings from content.

## Phase 4: Performance, accessibility, and SEO

### Performance

- Convert large raster images to responsive AVIF/WebP variants.
- Remove unused source images and vendor libraries from the deployed artifact.
- Lazy-load below-the-fold media and supply image dimensions.
- Reduce font families, weights, icon fonts, CSS, and JavaScript.
- Keep core content visible if JavaScript fails.

### Accessibility

- Meet WCAG 2.2 AA for contrast, keyboard interaction, focus indication, names,
  landmarks, headings, and motion.
- Add a skip link, accessible mobile-navigation state, meaningful alternative
  text, and screen-reader text for icon-only links.
- Validate at 200% zoom and with reduced motion.

### SEO

- Add canonical, Open Graph, and social-card metadata.
- Add `Person` and `ProfilePage` structured data.
- Add `robots.txt`, a complete sitemap, and a branded `404.html`.
- Use descriptive titles and metadata with consistent claims.

### Acceptance criteria

- Production mobile Lighthouse: Performance >= 90, Accessibility >= 95, Best
  Practices >= 95, and SEO >= 95.
- Initial transfer target <= 1.2 MB and <= 25 requests.
- LCP <= 2.5 seconds, CLS <= 0.1, and total blocking time <= 200 ms under the
  agreed Lighthouse profile.
- No serious or critical automated accessibility issue.

## Phase 5: GitHub Pages delivery and quality gates

### Work

- Build the static site and CV in GitHub Actions.
- Run secret scan, HTML validation, link checks, accessibility checks, and
  Lighthouse budgets before deployment.
- Deploy only a generated public artifact from `main`; source-only files,
  reports, credentials, and development assets must never enter the artifact.
- Protect the `github-pages` environment and retain a manual deployment option.
- Keep `dev` or pull requests for review and `main` as the production source.

### Acceptance criteria

- A failed security, build, or validation gate blocks deployment.
- The live version can be traced to one commit.
- The deployed artifact contains only intended public files.
- The live site matches the approved responsive and CV outputs.

## Validation matrix

| Area | Validation |
| --- | --- |
| Security | Secret scan, artifact inventory, fresh-clone history scan |
| HTML | HTML validation and semantic outline review |
| Links | Internal anchor and external link check |
| Accessibility | Automated audit plus keyboard and zoom checks |
| Responsive UI | 320, 390, 768, 1024, and 1440 px screenshots |
| Performance | Mobile and desktop Lighthouse reports |
| CV | Static-text check, print preview, PDF text extraction |
| Deployment | GitHub Pages artifact and production smoke test |

## External gates

The following actions cannot be completed safely without confirmation:

1. Credential rotation/revocation in Gmail, Google Cloud, GitLab, and any other
   affected provider.
2. Destructive Git history rewriting and force-pushing sanitized branches/tags.
3. Publication of any additional credential without its supporting document.

## Implementation status — 28 Jul 2026

- Security-sensitive files and unsupported authentication/contact code have
  been removed from the current tree.
- The static GitHub Pages build, semantic portfolio, and ATS-friendly HTML CV
  are implemented from `data/profile.json`.
- The confirmed hybrid positioning, role-embedded metrics, broader impact
  stories, two-project rotating ribbon, seamless company/university identities,
  engineering portrait, and icon-led contact directory are implemented.
- The two-page, tagged, text-extractable A4 CV PDF has been regenerated with
  the confirmed outcomes.
- Build artifact checks, performance budgets, HTML validation, internal link
  validation, current-tree secret scanning, responsive visual QA, and CV text
  extraction pass locally.
- Desktop and mobile Lighthouse both score 100 for Performance,
  Accessibility, Best Practices, and SEO; measured mobile LCP is 1.4 seconds
  with zero layout shift.
- Remaining delivery work is the merge and GitHub Pages deployment.
- Git history still requires a separate, explicitly approved rewrite after
  affected credentials are confirmed rotated. A normal merge removes files
  from the current branch but does not erase them from earlier commits.

## Definition of done

- No exposed secret exists in the current repository, its reachable history, or
  the deployed artifact.
- The portfolio is visually polished, responsive, keyboard accessible, and
  performant.
- Career positioning, dates, experience, projects, and credentials are
  consistent and verified.
- The downloadable CV is ATS-friendly, text based, and role targeted.
- CI validates and deploys a deterministic GitHub Pages artifact from `main`.
