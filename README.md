# Български Йогурт — Landing Page

**Client:** Български Йогурт ЕООД  
**Built by:** GG Solutions  
**Stack:** HTML5 + Tailwind CSS (CDN) + Vanilla JS  

---

## 📁 Project Structure

```
bulgarski-yogurt/
├── index.html              # Main landing page (entry point)
├── assets/
│   ├── images/             # Product & hero photography (.avif)
│   └── icons/              # SVG icon exports (inline in HTML)
├── css/
│   └── custom.css          # Custom animations, fonts, overrides
├── js/
│   ├── main.js             # Core interactions (nav, scroll, etc.)
│   └── analytics.js        # GA4 + event tracking
├── components/             # Reusable HTML snippets (reference only)
│   ├── header.html
│   ├── hero.html
│   ├── products.html
│   └── footer.html
└── README.md
```

---

## 🎨 Design System

| Token         | Value        | Usage                    |
|---------------|--------------|--------------------------|
| Royal Blue    | `#1e3a8a`    | Primary brand, nav, CTAs |
| Gold          | `#d97706`    | Accents, hover, premium  |
| White         | `#ffffff`    | Base background          |
| Gray Light    | `#f9fafb`    | Section alternation      |
| Dark Navy     | `#0f172a`    | B2B CTA section          |

**Fonts:** Playfair Display (headings) + DM Sans (body)

---

## 📊 Analytics Events (js/analytics.js)

| Event              | Trigger                        |
|--------------------|--------------------------------|
| `cta_partner_hero` | Hero "Стани наш партньор" click|
| `cta_products`     | "Виж продуктите" click         |
| `cta_b2b_contact`  | B2B section CTA click          |
| `nav_contact`      | Header "Запитване за търговци" |
| `scroll_depth_50`  | User scrolls past 50%          |
| `scroll_depth_100` | User reaches footer            |

---

## 🚀 Deploy

Static site — just serve `index.html`. No build step required.  
Cookie/GDPR banner injected globally via `app.js` (GG Solutions infra).
