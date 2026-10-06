# Design and Development Guidelines - unodetantosluises

## Visual Identity and Fidelity

- **No generic styles:** This website is personal and has a unique identity. It is strictly prohibited to use generic template styles (such as Bootstrap, default Tailwind, or standard AI components).
- **Strict adherence to the design:** All visual development must be based exactly on the screenshots and Figma designs provided by the user. Do not add margins, rounded corners, shadows, or decorative effects that are not explicitly shown in the visual reference.
- **Design questions:** If an interaction, state (hover/active), or responsive version is unclear in the image, ask the user instead of assuming a default design.

## Technical Stack

- **Frontend:** React 18 + Vite.
- **Routing:** React Router DOM (declarative routes in `src/App.jsx`).
- **Styles:** Sass / SCSS (`_name.scss` files alongside each component/page) + Centralized Design Tokens (`src/styles/_theme.scss`).
- **Semantics:** Clean and accessible HTML5, avoiding unnecessary divs.

## Project Structure & Architecture

- **Pages (`src/pages/`):**
  - `/` -> `Home/Home.jsx` (Navigation canvas with folders and intro).
  - `/portafolio` -> `Portfolio/Portfolio.jsx` (Interactive project showcase with `PortfolioCard.jsx`, smooth translucent hover overlays, and dynamic tech stack badges).
  - `/portafolio/:slug` -> `PortfolioProject/PortfolioProject.jsx` (Dynamic project case study view with Markdown typography, metadata sidebar, and retro scrollbar).
  - `/experiencia` -> `Experience/Experience.jsx`
  - `/blog` -> `Blog/Blog.jsx`
  - `/blog/posts` -> `BlogPosts/BlogPosts.jsx` (Complete blog archives with search and dynamic pagination).
  - `/blog/posts/:slug` -> `BlogPost/BlogPost.jsx` (Individual post view with dynamic slug, Markdown typography, and retro scrollbar).
  - `/sobre-mi` -> `About/About.jsx`
  - `/contacto` -> `Contact/Contact.jsx` (Interactive contact page with CSS sprite sheet envelope animation, controlled form, kaomojis fallback, and EmailJS integration).
- **Shared Components (`src/components/`):**
  - `BackgroundGrid`: Exact non-uniform vector grid and pixel blocks background (preserved on every page).
  - `BlogPostLayout`: Semantic MDX/Markdown post wrapper (`<article className="blog-post">`) with pinned `<hgroup>`, pure CSS border separator on `<h1>`, and retro 8px scrollbar.
  - `BlogMdxComponents`: Modular MDX presentation components (`Note`, `Warning`, `Step`, `Terminal`) used inside blog articles for styled callouts, numbered step badges, and macOS-style code terminal frames.
  - `PortafolioPostLayout`: Semantic MDX/Markdown project case study wrapper with pinned `<header className="project-header">`, pure CSS border separator on `<h1>`, `<aside className="project-details">` metadata sidebar, and retro 8px scrollbar.
  - `Controls`: Universal controls placed on the top-right corner (Day/Night theme toggle and Home navigation button).
  - `Layout`: Top-level wrapper for consistent canvas dimensions and responsiveness.
  - `ReturnButton`: Reusable back button with Day/Night contrast icons and history navigation for subpages.
  - `Roles`: Dynamic rotating roles displayed on the Home hero section.
  - `SEO`: Reusable head management component powered by `react-helmet-async` for OpenGraph, Twitter Cards, and schema.org JSON-LD structured data.
- **Context & State:**
  - `ThemeContext`: Global dark/light theme state controlling `data-theme` on the body, CSS variables, and dynamic mobile browser `theme-color`.
- **Custom Hooks (`src/hooks/`):**
  - `useDocumentTitle`: Declaratively updates `document.title` on route/slug transitions (`[PÃƒÂ¡gina/Post] | UnoDeTantosLuises`).
  - `useCanvasScale`: Computes and applies proportional scale factors for canvas-based pixel-art viewports.

## Content & Headless CMS Architecture

- **Engine:** Internal Vite-powered MDX pipeline configured in `vite.config.js` with `@mdx-js/rollup`, `remark-frontmatter`, and `remark-mdx-frontmatter`.
- **Data Bank (`src/content/`):**
  - `src/content/blog/`: Markdown/MDX articles with YAML frontmatter (`title`, `subtitle`, `date`, `tags`, `coverImage`).
  - `src/content/projects/`: Project case studies with YAML frontmatter (`title`, `type`, `techStack`, `repoUrl`, `liveUrl`, `coverImage`).
  - `src/content/experience/`: Work experience records with YAML frontmatter (`role`, `company`, `location`, `startDate`, `endDate`, `skills`).
- **Resolver Utility (`src/utils/contentResolver.js`):**
  - Eagerly reads MDX modules via `import.meta.glob('../content/*/*.mdx', { eager: true })`.
  - Exposes `getBlogPosts()`, `getBlogPostBySlug()`, `getProjects()`, `getProjectBySlug()`, `getExperience()`, and `getExperienceBySlug()`, sorted by date descending.

## SEO, Domain & Deployment

- **Custom Domain:** `https://unodetantosluises.me` configured in `public/CNAME` for GitHub Pages.
- **Metadata:** Open Graph and Twitter Card tags linked in `index.html` referencing `public/og-cover.png` (1495Ãƒâ€”808 px, ~105 KB).
- **Crawlers & Indexing:** `public/robots.txt` (permissive crawling) and `public/sitemap.xml` with canonical routes, change frequencies, and modification timestamps.
- **SPA 404 Routing:** `public/404.html` and `index.html` decoding script to allow direct URL reloads on GitHub Pages.
- **CI/CD Pipeline (`.github/workflows/deploy.yml`):**
  - Triggers on `push` to `main`.
  - Runs `npm run validate:content` (`scripts/validate-content.js`) to audit YAML frontmatter contracts, syntax errors, and missing assets before building.
  - Builds and deploys directly to native GitHub Pages with EmailJS secrets injection.
