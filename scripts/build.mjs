import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { icons as logoIcons } from "@iconify-json/logos";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const profile = JSON.parse(readFileSync(join(root, "data/profile.json"), "utf8"));
const dist = join(root, "dist");

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const escapeAttribute = escapeHtml;

const renderBrandLogo = (iconName) => {
  const icon = logoIcons.icons[iconName];
  if (!icon) {
    throw new Error(`Missing contact logo: ${iconName}`);
  }

  const prefix = `contact-${iconName}`;
  const body = icon.body
    .replace(/id="([^"]+)"/g, `id="${prefix}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`);
  const width = icon.width ?? logoIcons.width ?? 24;
  const height = icon.height ?? logoIcons.height ?? 24;

  return `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true" focusable="false">${body}</svg>`;
};

const renderTags = (items, className = "tag-list") =>
  `<ul class="${className}">${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul>`;

const renderExperience = () =>
  profile.experience
    .map(
      (company) => `
        <article class="company-block">
          <header class="company-header">
            <a class="company-logo" href="${escapeAttribute(company.companyUrl)}" rel="noreferrer" aria-label="${escapeAttribute(company.company)} website">
              <img
                src="${escapeAttribute(company.logo)}"
                width="${escapeAttribute(company.logoWidth)}"
                height="${escapeAttribute(company.logoHeight)}"
                alt="${escapeAttribute(company.logoAlt)}"
                loading="lazy"
                decoding="async"
              >
            </a>
            <div>
              <p class="company-period">${escapeHtml(company.period)}</p>
              <h3><a href="${escapeAttribute(company.companyUrl)}" rel="noreferrer">${escapeHtml(company.company)}</a></h3>
              <p>${escapeHtml(company.location)}</p>
            </div>
          </header>
          <div class="role-list">
            ${company.roles
              .map(
                (role) => `
                  <section class="role">
                    <div class="role-heading">
                      <h4>${escapeHtml(role.title)}</h4>
                      <p>${escapeHtml(role.period)}</p>
                    </div>
                    <p class="role-summary">${escapeHtml(role.summary)}</p>
                    <ul class="achievement-list">
                      ${role.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
                    </ul>
                    ${renderTags(role.technologies)}
                  </section>`
              )
              .join("")}
          </div>
        </article>`
    )
    .join("");

const renderCapabilities = () =>
  profile.capabilities
    .map(
      (capability, index) => `
        <article class="capability-card">
          <span class="card-index" aria-hidden="true">0${index + 1}</span>
          <h3>${escapeHtml(capability.title)}</h3>
          <p>${escapeHtml(capability.description)}</p>
          ${renderTags(capability.skills)}
        </article>`
    )
    .join("");

const renderCaseStudies = () =>
  profile.caseStudies
    .map(
      (study) => `
        <article class="case-study">
          <div class="case-number" aria-hidden="true">${escapeHtml(study.number)}</div>
          <div class="case-content">
            <p class="case-context">${escapeHtml(study.context)}</p>
            <h3>${escapeHtml(study.title)}</h3>
            <dl class="case-details">
              <div>
                <dt>Challenge</dt>
                <dd>${escapeHtml(study.challenge)}</dd>
              </div>
              <div>
                <dt>Approach</dt>
                <dd>${escapeHtml(study.approach)}</dd>
              </div>
              <div>
                <dt>Outcome</dt>
                <dd>${escapeHtml(study.outcome)}</dd>
              </div>
            </dl>
            ${renderTags(study.skills)}
          </div>
        </article>`
    )
    .join("");

const renderEarlierProjects = () => {
  const projectsPerPage = 2;
  const renderProject = (project, index) => {
      const projectTitle = project.url
        ? `<a href="${escapeAttribute(project.url)}" rel="noreferrer">${escapeHtml(project.title)}</a>`
        : escapeHtml(project.title);
      const projectLink = project.url
        ? `<a class="text-link" href="${escapeAttribute(project.url)}" rel="noreferrer">
            View project <span aria-hidden="true">↗</span>
          </a>`
        : `<span class="project-archive-label">Archive project · Link not published</span>`;

      return `
        <article class="project-ribbon-card">
          <div class="project-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>
          <div class="project-content">
            <p class="project-period">${escapeHtml(project.period)}</p>
            <h3>${projectTitle}</h3>
            <p>${escapeHtml(project.description)}</p>
            <p class="project-contribution">${escapeHtml(project.contribution)}</p>
            ${projectLink}
          </div>
        </article>`;
  };

  const pages = Array.from(
    { length: Math.ceil(profile.earlierProjects.length / projectsPerPage) },
    (_, pageIndex) => {
      const pageStart = pageIndex * projectsPerPage;
      const pageProjects = profile.earlierProjects.slice(
        pageStart,
        pageStart + projectsPerPage
      );
      const pageEnd = pageStart + pageProjects.length;

      return `
        <div
          class="project-page${pageIndex === 0 ? " is-active" : ""}"
          data-project-slide
          data-project-start="${pageStart + 1}"
          data-project-end="${pageEnd}"
          aria-hidden="${pageIndex === 0 ? "false" : "true"}"
          ${pageIndex === 0 ? "" : "hidden"}
        >
          ${pageProjects
            .map((project, projectIndex) => renderProject(project, pageStart + projectIndex))
            .join("")}
        </div>`;
    }
  )
    .join("");

  const fallback = profile.earlierProjects
    .map((project) => `<li>${escapeHtml(project.title)} · ${escapeHtml(project.period)}</li>`)
    .join("");

  return `
    <section class="project-carousel" data-project-carousel aria-roledescription="carousel" aria-label="Project archive">
      <div class="project-carousel-bar">
        <p>
          <span data-project-current>01–02</span>
          <span aria-hidden="true">/</span>
          <span class="sr-only">of</span>
          <span>${String(profile.earlierProjects.length).padStart(2, "0")}</span>
        </p>
        <div class="project-controls">
          <button type="button" data-project-previous aria-label="Show previous project">←</button>
          <button type="button" data-project-next aria-label="Show next project">→</button>
        </div>
      </div>
      <div class="project-viewport" data-project-viewport aria-live="polite">
        ${pages}
      </div>
      <div class="project-progress" aria-hidden="true">
        <span data-project-progress></span>
      </div>
    </section>
    <noscript>
      <div class="project-fallback">
        <p>Project archive</p>
        <ul>${fallback}</ul>
      </div>
    </noscript>`;
};

const renderCertifications = () =>
  profile.certifications
    .map(
      (certification) => `
        <article class="credential-card">
          <div class="credential-wordmark">
            <span>T-CERT</span>
            <small>System Academy</small>
          </div>
          <p class="credential-label">Professional credential</p>
          <h3>${escapeHtml(certification.name)}</h3>
          <p>${escapeHtml(certification.issuer)} · ${escapeHtml(certification.date)}</p>
          <p class="credential-note">${escapeHtml(certification.note)}</p>
          <p class="credential-note">Certificate No. ${escapeHtml(certification.certificateNumber)}</p>
          <a class="text-link" href="${escapeAttribute(certification.url)}">
            View credential <span aria-hidden="true">↗</span>
          </a>
        </article>`
    )
    .join("");

const renderEducation = () =>
  profile.education
    .map(
      (education) => `
        <article class="credential-card">
          <a class="credential-logo" href="${escapeAttribute(education.url)}" rel="noreferrer" aria-label="${escapeAttribute(education.institution)} website">
            <img
              src="${escapeAttribute(education.logo)}"
              width="${escapeAttribute(education.logoWidth)}"
              height="${escapeAttribute(education.logoHeight)}"
              alt="${escapeAttribute(education.logoAlt)}"
              loading="lazy"
              decoding="async"
            >
          </a>
          <p class="credential-label">${escapeHtml(education.period)}</p>
          <h3>${escapeHtml(education.degree)}</h3>
          <p>${escapeHtml(education.specialization)}</p>
          <p>${escapeHtml(education.institution)} · ${escapeHtml(education.location)}</p>
          <div class="credential-links">
            ${(education.documents ?? [])
              .map(
                (document) => `
                  <a class="text-link" href="${escapeAttribute(document.url)}">
                    ${escapeHtml(document.label)} <span aria-hidden="true">↗</span>
                  </a>`
              )
              .join("")}
            <a class="text-link" href="${escapeAttribute(education.url)}" rel="noreferrer">
              University website <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>`
    )
    .join("");

const renderContactDetails = () => {
  const details = [
    {
      label: "Primary email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: "assets/img/gmail.svg"
    },
    {
      label: "Professional email",
      value: profile.secondaryEmail,
      href: `mailto:${profile.secondaryEmail}`,
      icon: "assets/img/gmail.svg"
    },
    {
      label: "Phone · UAE",
      value: profile.phone,
      href: `tel:${profile.phone.replaceAll(" ", "")}`,
      icon: "assets/img/phone.png"
    },
    {
      label: "WhatsApp",
      value: profile.whatsapp,
      href: profile.links.whatsapp,
      icon: "assets/img/WhatsApp.svg"
    }
  ];

  const networks = [
    {
      label: "LinkedIn",
      icon: "linkedin-icon",
      href: profile.links.linkedin
    },
    {
      label: "GitHub",
      icon: "github-icon",
      href: profile.links.github
    },
    {
      label: "Facebook",
      icon: "facebook",
      href: profile.links.facebook
    },
    {
      label: "Instagram",
      icon: "instagram-icon",
      href: profile.links.instagram
    },
    {
      label: "Teams",
      icon: "microsoft-teams",
      href: profile.links.teams,
      account: profile.teamsEmail
    }
  ];

  return `
    <div class="contact-directory">
      ${details
        .map(
          (detail) => `
            <a class="contact-card" href="${escapeAttribute(detail.href)}">
              <span class="contact-icon" aria-hidden="true">
                <img src="${escapeAttribute(detail.icon)}" width="40" height="40" alt="" loading="lazy" decoding="async">
              </span>
              <span class="contact-card-copy">
                <span>${detail.href.startsWith("tel:")
                  ? escapeHtml(detail.label).replaceAll(" ", "&nbsp;")
                  : escapeHtml(detail.label)}</span>
                <strong>${detail.label === "Phone · UAE" || detail.label === "WhatsApp"
                  ? escapeHtml(detail.value).replaceAll(" ", "&nbsp;")
                  : escapeHtml(detail.value)}</strong>
              </span>
              <i aria-hidden="true">↗</i>
            </a>`
        )
        .join("")}
    </div>
    <nav class="contact-networks" aria-label="Social profiles">
      <p>Find me online</p>
      <div>
        ${networks
          .map(
            ({ label, icon, href, account }) =>
              `<a
                href="${escapeAttribute(href)}"
                rel="noreferrer"
                ${account ? `title="${escapeAttribute(`${label} · ${account}`)}"` : ""}
              >
                <span class="network-mark network-mark-${escapeAttribute(icon)}">${renderBrandLogo(icon)}</span>
                <span>${escapeHtml(label)}</span>
                ${account ? `<span class="sr-only"> using ${escapeHtml(account)}</span>` : ""}
              </a>`
          )
          .join("")}
      </div>
    </nav>`;
};

const renderAbout = () =>
  profile.about.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");

const renderCvContact = () => `
  <address class="cv-contact">
    <span>${escapeHtml(profile.location)}</span>
    <a href="mailto:${escapeAttribute(profile.email)}">${escapeHtml(profile.email)}</a>
    <a href="tel:${escapeAttribute(profile.phone.replaceAll(" ", ""))}">${escapeHtml(profile.phone).replaceAll(" ", "&nbsp;")}</a>
    <a href="${escapeAttribute(profile.links.linkedin)}">${escapeHtml(profile.links.linkedin.replace("https://www.", ""))}</a>
    <a href="${escapeAttribute(profile.links.github)}">${escapeHtml(profile.links.github.replace("https://", ""))}</a>
    <a href="${escapeAttribute(profile.links.portfolio)}">${escapeHtml(profile.links.portfolio.replace("https://", ""))}</a>
  </address>`;

const renderCvSkills = () =>
  profile.capabilities
    .map(
      (capability) => `
        <div class="cv-skill-group">
          <h3>${escapeHtml(capability.title)}</h3>
          <p>${escapeHtml(capability.skills.join(", "))}</p>
        </div>`
    )
    .join("");

const renderCvHighlights = () =>
  `<ul class="cv-highlights">${profile.cvHighlights
    .map((highlight) => `<li>${escapeHtml(highlight)}</li>`)
    .join("")}</ul>`;

const renderCvExperience = () =>
  profile.experience
    .map(
      (company) => `
        <article class="cv-company">
          <header class="cv-company-header">
            <div>
              <h3>${escapeHtml(company.company)}</h3>
              <p>${escapeHtml(company.location)}</p>
            </div>
            <p>${escapeHtml(company.period)}</p>
          </header>
          ${company.roles
            .map(
              (role) => `
                <section class="cv-role">
                  <header>
                    <h4>${escapeHtml(role.title)}</h4>
                    <p>${escapeHtml(role.period)}</p>
                  </header>
                  <p class="cv-role-summary">${escapeHtml(role.summary)}</p>
                  <ul>
                    ${role.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
                  </ul>
                  <p class="cv-stack"><strong>Technologies:</strong> ${escapeHtml(role.technologies.join(", "))}</p>
                </section>`
            )
            .join("")}
        </article>`
    )
    .join("");

const renderCvCertifications = () =>
  profile.certifications
    .map(
      (certification) => `
        <article class="cv-simple-item">
          <h3>${escapeHtml(certification.name)}</h3>
          <p>${escapeHtml(certification.issuer)} · ${escapeHtml(certification.date)}</p>
          <p>${escapeHtml(certification.note)}</p>
          <p>Certificate No. ${escapeHtml(certification.certificateNumber)}</p>
        </article>`
    )
    .join("");

const renderCvEducation = () =>
  profile.education
    .map(
      (education) => `
        <article class="cv-simple-item cv-education">
          <div>
            <h3>${escapeHtml(education.degree)} — ${escapeHtml(education.specialization)}</h3>
            <p>${escapeHtml(education.institution)}, ${escapeHtml(education.location)}</p>
          </div>
          <p>${escapeHtml(education.period)}</p>
        </article>`
    )
    .join("");

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateModified: profile.site.lastUpdated,
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    url: profile.site.url,
    email: `mailto:${profile.email}`,
    jobTitle: profile.headline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE"
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education[0].institution
    },
    sameAs: [
      profile.links.linkedin,
      profile.links.github,
      profile.links.facebook,
      profile.links.instagram
    ],
    knowsAbout: profile.capabilities.flatMap((capability) => capability.skills)
  }
});

const common = {
  name: escapeHtml(profile.name),
  shortName: escapeHtml(profile.shortName),
  headline: escapeHtml(profile.headline),
  eyebrow: escapeHtml(profile.eyebrow),
  location: escapeHtml(profile.location),
  email: escapeHtml(profile.email),
  emailHref: escapeAttribute(profile.email),
  secondaryEmail: escapeHtml(profile.secondaryEmail),
  phone: escapeHtml(profile.phone),
  phoneHref: escapeAttribute(profile.phone.replaceAll(" ", "")),
  whatsapp: escapeAttribute(profile.links.whatsapp),
  portfolio: escapeAttribute(profile.links.portfolio),
  linkedin: escapeAttribute(profile.links.linkedin),
  github: escapeAttribute(profile.links.github),
  summary: escapeHtml(profile.summary),
  heroSummary: escapeHtml(profile.heroSummary),
  cvHeadline: escapeHtml("Technical Lead & Information Security Manager"),
  cvTitle: escapeHtml(`${profile.name} — Technical Lead CV`),
  cvDescription: escapeAttribute(
    `ATS-friendly CV for ${profile.name}, Technical Lead, Lead Software Engineer, and Information Security Manager.`
  ),
  siteTitle: escapeHtml(profile.site.title),
  siteDescription: escapeAttribute(profile.site.description),
  siteUrl: escapeAttribute(profile.site.url),
  lastUpdated: escapeHtml(profile.site.lastUpdated)
};

const replaceTokens = (template, values) => {
  let result = template;
  for (const [key, value] of Object.entries(values)) {
    result = result.replaceAll(`{{${key}}}`, value);
  }
  const unresolved = result.match(/\{\{[a-zA-Z0-9]+\}\}/g);
  if (unresolved) {
    throw new Error(`Unresolved template tokens: ${[...new Set(unresolved)].join(", ")}`);
  }
  return `${result.replace(/[ \t]+$/gm, "").trimEnd()}\n`;
};

const indexTemplate = readFileSync(join(root, "src/index.template.html"), "utf8");
const cvTemplate = readFileSync(join(root, "src/cv.template.html"), "utf8");
const notFoundTemplate = readFileSync(join(root, "src/404.template.html"), "utf8");

const indexHtml = replaceTokens(indexTemplate, {
  ...common,
  structuredData,
  experience: renderExperience(),
  capabilities: renderCapabilities(),
  caseStudies: renderCaseStudies(),
  earlierProjects: renderEarlierProjects(),
  certifications: renderCertifications(),
  education: renderEducation(),
  contactDetails: renderContactDetails(),
  about: renderAbout()
});

const cvHtml = replaceTokens(cvTemplate, {
  ...common,
  cvContact: renderCvContact(),
  cvSkills: renderCvSkills(),
  cvExperience: renderCvExperience(),
  cvHighlights: renderCvHighlights(),
  cvCertifications: renderCvCertifications(),
  cvEducation: renderCvEducation()
});

const notFoundHtml = replaceTokens(notFoundTemplate, common);
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${profile.site.url}sitemap.xml\n`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${profile.site.url}</loc>
    <lastmod>${profile.site.lastUpdated}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${profile.site.url}cv.html</loc>
    <lastmod>${profile.site.lastUpdated}</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
`;

const manifest = JSON.stringify(
  {
    name: `${profile.shortName} — Professional Portfolio`,
    short_name: profile.shortName,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1ea",
    theme_color: "#0b1f33",
    icons: [
      {
        src: "/assets/img/favicon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  },
  null,
  2
);

const writeGenerated = (relativePath, content) => {
  const rootTarget = join(root, relativePath);
  const distTarget = join(dist, relativePath);
  mkdirSync(dirname(rootTarget), { recursive: true });
  mkdirSync(dirname(distTarget), { recursive: true });
  writeFileSync(rootTarget, content);
  writeFileSync(distTarget, content);
};

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

writeGenerated("index.html", indexHtml);
writeGenerated("cv.html", cvHtml);
writeGenerated("404.html", notFoundHtml);
writeGenerated("robots.txt", robots);
writeGenerated("sitemap.xml", sitemap);
writeGenerated("site.webmanifest", `${manifest}\n`);

for (const asset of [
  "assets/css/site.css",
  "assets/css/cv.css",
  "assets/js/site.js",
  "assets/img/favicon.svg",
  "assets/img/delupe.png",
  "assets/img/Dialog_Axiata.png",
  "assets/img/virtusa.png",
  "assets/img/UOP.png",
  "assets/img/profile-engineering.webp",
  "assets/img/gmail.svg",
  "assets/img/phone.png",
  "assets/img/WhatsApp.svg",
  "3fbba454464e4fe7b57110f5f0757755.txt"
]) {
  const source = join(root, asset);
  const target = join(dist, asset);
  if (!existsSync(source)) {
    throw new Error(`Missing public asset: ${asset}`);
  }
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}

for (const document of [
  "assets/documents/iso-27001-internal-auditor-certificate.pdf",
  "assets/documents/Degree Certificate - Redacted.pdf",
  "assets/documents/Transcript - Redacted.pdf",
  "assets/documents/Advance Level Certificate - Redacted.pdf"
]) {
  const source = join(root, document);
  if (!existsSync(source)) {
    throw new Error(`Missing public document: ${document}`);
  }
  const target = join(dist, document);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}

const cvPdf = join(root, "assets/documents/Gayan_Thejawansha_CV.pdf");
if (existsSync(cvPdf)) {
  const target = join(dist, "assets/documents/Gayan_Thejawansha_CV.pdf");
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(cvPdf, target);
}

console.log(`Built portfolio and CV for ${profile.name}`);
