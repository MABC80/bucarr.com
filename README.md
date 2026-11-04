# bucarr.com

Static recreation of the BuCarr website (Carbono carbon-fibre calibration plates, Landsberg am Lech). The previous host could not export the site, so this version is plain HTML and CSS, with no build step and no third-party trackers.

It is meant to be published with GitHub Pages from the root of the `main` branch, including as a project site such as `https://mabc80.github.io/bucarr.com/`. Links are relative, so they keep working under that subpath. There is no `CNAME` file: `bucarr.com` stays on the current host until the domain is moved.

## Pages

| Path | Page |
| --- | --- |
| `index.html` | Startseite |
| `anwendungen/index.html` | Anwendungen |
| `kontakt/index.html` | Kontakt |
| `impressum/index.html` | Impressum |
| `datenschutz/index.html` | Datenschutz |
| `agb/index.html` | AGB |
| `404.html` | Unknown addresses |

The directory `index.html` files keep the old paths (`/anwendungen`, `/kontakt`, `/impressum`, `/datenschutz`, `/agb`).

## Files

- `css/styles.css` — shared layout, colours, and the mobile menu
- `assets/` — images saved from the previous site (logos, product photos, application figures, favicon)
- `.nojekyll` — tells GitHub Pages to serve the files as they are

Headings use Nunito Sans and body text uses Zilla Slab, loaded from Google Fonts, in place of the Museo fonts on the previous site.

## Contact

GitHub Pages cannot receive form posts. The Kontakt page therefore uses a mailto button to `info@bucarr.com` and shows the phone number `0151/25507249`, instead of the previous contact form.

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`. To check the project-site subpath, serve the parent directory so the site is available at `/bucarr.com/`.
