
# Static HTML Conversion

This folder contains a static HTML rendition of the original React + TypeScript project.

## Files
- `index.html` — a single, standalone page combining all sections (Header, Hero, About, Practice Areas, Team, Testimonials, Contact, Footer).
- `header.html`, `hero.html`, `about.html`, `practice-areas.html`, `team.html`, `testimonials.html`, `contact.html`, `footer.html` — individual HTML pages for each section, wrapped with the same `<head>` and Tailwind CSS.
- `README_convert.md` — this file.

## Notes
- Tailwind CSS is loaded via CDN, matching the original palette (brand-lime, brand-dark, brand-gray).
- Interactive React behaviors (state, smooth scroll handler, form handling) were simplified. Smooth scrolling relies on CSS `scroll-behavior: smooth`.
- Images use placeholder `picsum.photos` URLs from the original components.
- Practice areas, team members, and testimonials were reconstructed as static content to mirror the structure.
