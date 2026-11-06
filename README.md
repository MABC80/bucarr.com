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
- `js/carousel.js` — the three product photos on the home page
- `js/kontakt.js` — sends the contact form through Web3Forms
- `assets/` — images saved from the previous site (logos, product photos, application figures, favicon)
- `llms.txt`, `robots.txt`, `sitemap.xml` — discovery files; canonical URLs use `https://bucarr.com`
- `.nojekyll` — tells GitHub Pages to serve the files as they are

Headings use Nunito Sans and body text uses Zilla Slab, loaded from Google Fonts, in place of the Museo fonts on the previous site.

## Contact form

The Kontakt page posts to [Web3Forms](https://web3forms.com/) (`https://api.web3forms.com/submit`). The access key is a public identifier for `info@bucarr.com`, not a private secret. It is still a placeholder:

`WEB3FORMS_ACCESS_KEY` in `kontakt/index.html`

Until that value is replaced, the form does not claim success. It asks the visitor to write to `info@bucarr.com` instead.

To activate it:

1. Open [web3forms.com](https://web3forms.com/) and request an access key for `info@bucarr.com`.
2. Open the confirmation mail sent to that address and copy the public access key.
3. Replace `WEB3FORMS_ACCESS_KEY` in `kontakt/index.html` with that key.

No other credential is required.

## Discovery

`robots.txt` allows normal search and AI crawlers. `sitemap.xml` and the `canonical` / Open Graph URLs use `https://bucarr.com/...`. Those addresses apply once the domain points at this site. Relative links keep the GitHub Pages preview at `https://mabc80.github.io/bucarr.com/` working, and `robots.txt` also lists that preview sitemap. `llms.txt` is a short factual summary of the existing pages; it does not promise mentions in model answers.

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`. To check the project-site subpath, serve the parent directory so the site is available at `/bucarr.com/`.

