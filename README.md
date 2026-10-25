# श्री साईं बाबा मंदिर – धीराचक, अनीसाबाद, पटना

Static Hindi website for Shri Sai Baba Temple, Dhirachak, Anisabad, Patna (Bihar).
Built with **Bootstrap 5.3** (CSS + JS via jsDelivr CDN) and Bootstrap Icons. Designed for deployment on **Netlify**.

## Structure

```
index.html        Main single-page site (hero, about, aarti timings, 11 vachan, festivals, seva, gallery, donation, contact)
thank-you.html    Shown after the contact form is submitted (Netlify Forms)
404.html          Custom "page not found" page (Netlify uses it automatically)
credits.html      Image attributions (required by CC BY / CC BY-SA licenses)
css/style.css     Custom theme (saffron / maroon / gold)
js/main.js        Gallery filter + lightbox, counters, scroll animations, form validation, UPI copy
images/           Optimised images from Wikimedia Commons
netlify.toml      Netlify publish settings and headers
```

## Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy on Netlify

1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import an existing project** → choose the repo.
3. Leave the build command empty. Set publish directory to `.` (already set in `netlify.toml`).
4. Deploy. The contact form is detected automatically by **Netlify Forms**. Submissions appear under *Site → Forms*.

You can also drag and drop the project folder on <https://app.netlify.com/drop>.

## Before going live – update these placeholders

| What | Where |
|------|-------|
| Phone number `+91 00000 00000` | `index.html` (top bar and contact section) |
| Email `info@saibabamandirpatna.in` | `index.html` (contact section) |
| UPI ID `saibabamandir@upi` | `index.html` (donate section) |
| Bank name / account number / IFSC | `index.html` (donate section, "बैंक ट्रांसफ़र" tab) |
| Social media links (`href="#"`) | `index.html` footer |
| Aarti / programme timings | `index.html` (aarti section) and footer |
| Map location | `iframe` in the contact section (replace with the exact Google Maps embed link) |

## Images

Photos are symbolic and come from Wikimedia Commons (Public domain, CC0, GODL-India, CC BY, CC BY-SA).
See `credits.html` for authors and licenses. Replace them with real photos of the temple by keeping the same
file names in `images/` (or update the paths in `index.html`). If you remove an image, also remove its row from `credits.html`.
