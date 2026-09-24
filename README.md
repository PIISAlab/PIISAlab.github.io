# PIISA Lab website

Source for <https://piisalab.github.io> — Physics-Informed Intelligent Systems and Applications Lab, University of Science, VNU-HCM.
Astro + Tailwind, bilingual (Vietnamese at `/`, English at `/en/`), deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Updating content — edit data, not pages

| To change… | Edit | Notes |
|---|---|---|
| Members, alumni, theses | `src/data/people.yaml` | Order in the file = order on the page. Photo goes in `public/images/`. |
| Publications | `src/data/publications.yaml` | Add `doi:` (bare, `10.1109/...`) and the title links to it. |
| News | `src/data/news.yaml` | Newest first; the home page shows the latest three. |
| Research directions | `src/data/research.yaml` | Shared by the home page (`summary`) and Research page (`description`). |
| Nav, site name, affiliation | `src/i18n.ts` | |

Any field that differs by language is `{ vi: ..., en: ... }`; a plain string is shown in both.
The schemas in `src/content.config.ts` validate every entry — a typo fails the build instead of shipping a broken page.

Each page is written once in `src/pages/[...lang]/` and built for both languages.

## Commands

```sh
bun install
bun dev       # http://localhost:4321
bun run build # static site in dist/
```
