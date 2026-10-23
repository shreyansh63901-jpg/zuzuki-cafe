# Zuzuki Cafe website (demo)

Fast, static cafe website: menu with build-your-order, WhatsApp ordering and table booking, gallery, Hindi/English switch.
No backend, no database, no API keys, no cookies, no third-party scripts.

## Files
| File | What it is |
|---|---|
| `index.html` | Pages, styles and photos (built in) |
| `app.js` | Site logic (do not edit unless you know JavaScript) |
| `config.js` | **Edit this per client**: WhatsApp number, hours, address, phone, email, Instagram, dish prices |
| `vercel.json` | Security headers for Vercel (CSP, anti-clickjacking, HSTS) |

Upload all files together. `index.html` will not work without `app.js` and `config.js`.

## Customise for a client
1. Open `config.js` and fill in `CFG` (number with country code, digits only) and `PR` (prices).
2. Search `app.js` / `index.html` for `[` placeholders (offer, reviews, story, years) and replace them.

## Deploy
- **Vercel:** import the GitHub repo, Framework Preset `Other`, Deploy. `vercel.json` adds the security headers.
- **GitHub Pages:** Settings > Pages > Deploy from branch > `main` / root. (Pages cannot set HTTP headers; the CSP `<meta>` tag in `index.html` still applies.)

## Security notes
- Strict Content-Security-Policy: scripts only from this site, no inline scripts, no outside connections, no framing.
- All visitor input (booking form, search) is validated and length-limited; it is only ever put into a WhatsApp link, never into the page as HTML.
- The WhatsApp number and address are public by design. Use a business number.
- Turn on 2-factor authentication for your GitHub and Vercel accounts. Never commit passwords or API keys.
