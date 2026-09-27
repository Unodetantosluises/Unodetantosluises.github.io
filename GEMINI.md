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
  - `PortafolioPostLayout`: Semantic MDX/Markdown project case study wrapper with pinned `<header className="project-header">`, pure CSS border separator on `<h1>`, `<aside className="project-details">` metadata sidebar, and retro 8px scrollbar.
  - `Controls`: Universal controls placed on the top-right corner (Day/Night theme toggle and Home navigation button).
  - `Layout`: Top-level wrapper for consistent canvas dimensions and responsiveness.
  - `ReturnButton`: Reusable back button with Day/Night contrast icons and history navigation for subpages.
  - `Roles`: Dynamic rotating roles displayed on the Home hero section.
- **Context:**
  - `ThemeContext`: Global dark/light theme state controlling `data-theme` on the body and CSS variables.
