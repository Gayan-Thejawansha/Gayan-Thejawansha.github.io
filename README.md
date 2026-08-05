# Gayan Thejawansha — Professional Portfolio

Static portfolio and ATS-friendly CV for
[Gayan Shanaka Thejawansha](https://gayan-thejawansha.github.io/), a Lead
Software Engineer and Information Security Manager based in Dubai.

## Architecture

- `data/profile.json` is the authoritative career-content source.
- `src/*.template.html` contains semantic page templates.
- `scripts/build.mjs` renders the public HTML and creates an allowlisted
  `dist/` artifact.
- `assets/css/` and `assets/js/` contain the dependency-free presentation and
  interaction layer.
- `assets/documents/` contains the generated ATS-friendly PDF and redacted
  education and certification records linked from the portfolio. Encrypted
  source records are kept locally under the ignored `private/` directory.
- GitHub Actions validates and deploys only `dist/` to GitHub Pages.

The generated root `index.html`, `cv.html`, `404.html`, `robots.txt`,
`sitemap.xml`, and `site.webmanifest` are retained as a branch-publishing
fallback. Edit the templates or profile data rather than those generated files.

## Local development

Requires Node.js 22.19 or newer.

```bash
npm ci --ignore-scripts
npm test
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000/`.

## Quality gates

`npm test` runs:

- deterministic static generation;
- public-artifact inventory and secret-filename checks;
- performance budgets;
- HTML validation;
- internal link, fragment, and CSS URL validation.

The GitHub Pages workflow also regenerates the CV PDF and confirms that its key
text can be extracted.

## Deployment

Production deployment runs on pushes to `main` through
`.github/workflows/deploy-pages.yml`.

In repository **Settings → Pages → Build and deployment**, select **GitHub
Actions** as the source. Protect the `github-pages` environment so that only
`main` can deploy.

## Security notice

This repository previously contained public credentials. Deleting the files is
not sufficient because the values remain in Git history. Complete every step in
[SECURITY_CLEANUP.md](SECURITY_CLEANUP.md), including provider-side rotation,
before rewriting and force-pushing sanitized history.

Do not place credentials, recovery codes, private security reports, or
replacement secrets in this repository.
