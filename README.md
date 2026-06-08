# 📦 Skifteboksen v1 – README

**Skifteboksen** ("The Change Box") er en sesongskiftehjelp for norske foreldre med barn i barnehage, SFO og barneskole.

## 🎯 Hva løser Skifteboksen?

Norske foreldre bruker timer hver sesong på å finne ut:
- Hva skal barn ha på seg i minus 10 grader?
- Hva trenger vi på hytta?
- Hva skal på i barnehagen når været bytter?

Skifteboksen gir deg en sjekkliste for hver sesong, kontekst (barnehage/SFO/barneskole) og alder.

## ✨ Features – v1

- ✅ **4 sesonger** × **3 settinger** × **4 aldersgrupper** = 48 differensierte sjekklister
- ✅ **Lokalisert**: Full norsk (bokmål), foreldre-språk
- ✅ **Offline-first**: Sjekklister lagres på telefonen via localStorage
- ✅ **Tilpassbar**: Legg til egne items med notater
- ✅ **Møbil-først**: Store fingerablelisten, 48px touch targets
- ✅ **Tilgjengelig**: WCAG 2.1 AA, semantisk HTML, tastaturnavigasjon

## 🚀 Deployment – Azure Static Web Apps

### Forutsetninger
- GitHub-konto
- Azure-konto (gratis tier dekker dette)
- `dcps24/skifteboksen` repository

### Steg 1: Klon og push til GitHub

```bash
git clone https://github.com/dcps24/skifteboksen.git
cd skifteboksen

# Lag .gitignore
echo "node_modules/" > .gitignore

git add .
git commit -m "Initial commit: v1 MVP"
git push origin main
```

### Steg 2: Opprett Azure Static Web App

1. Gå til [Azure Portal](https://portal.azure.com)
2. Klikk **+ Create a resource** → **Static Web App**
3. Fyll inn:
   - **Name**: `skifteboksen`
   - **Region**: `West Europe` (nærmest Norge)
   - **GitHub account**: Logg inn
   - **Organization**: `dcps24`
   - **Repository**: `skifteboksen`
   - **Branch**: `main`
   - **Build presets**: `Custom`
   - **App location**: `.` (root)
   - **API location**: (leave blank)
   - **Output location**: `.` (root)

4. Klikk **Review + create** → **Create**

Azure vil automatisk opprett en GitHub Action som deployer når du pusher til `main`.

### Steg 3: Bekreft deployment

1. Gå til **GitHub** → **Actions** i ditt repo
2. Du skal se en workflow som heter `Azure Static Web Apps CI/CD`
3. Vent til den er grønn ✅
4. Gå til Azure portal og kopier URL-en under **Environment URLs**

Eksempel: `https://red-tree-xxx.azurestaticapps.net`

---

## 📁 Filstruktur

```
skifteboksen/
├── index.html              # Semantic HTML, PWA manifest
├── style.css               # Mobile-first, seasonal theming
├── app.js                  # Checklist logic, localStorage
├── manifest.json           # PWA configuration
├── staticwebapp.config.json # Azure routing
└── README.md               # This file
```

## 🔧 Lokalt Utvikling

Servering lokalt:

```bash
# Python 3
python -m http.server 8000

# Node.js (hvis du har det)
npx http-server
```

Gå til `http://localhost:8000`

---

## 📊 Telemark Pilot (Q3 2026)

**Scope**: Test sjekklister med 20–50 virkelige foreldre i Telemark.

**Målinger**:
- Weekly active users: 30+
- Checklist completion rate: 3+ per uke
- Return rate: 40%+

**Feedback-kanal**: [Foreldresiden.no](https://foreldresiden.no) + private Facebook-grupper

---

## 🔐 Privacy & GDPR

✅ **v1 er GDPR-compliant:**
- Null data-innsamling
- Null tracking
- Ingen cookies
- Alt lagres lokalt på enheten

**Privacy statement**:
> "Vi samler ikke persondata. Alle sjekklister lagres kun på din telefon."

---

## 🚧 Roadmap

### v2 (Q4 2026 – hvis pilot vellykket)
- Affiliate-lenker til norske barneklær-butikker
- Sponsor-partnerskaper (Reima, Stormberg, osv.)

### v3 (Q1 2027 – hvis v2 vellykket)
- **Bruktmarked**: Parents kan selge/kjøpe brukt sesongklær
- Requires: Supabase backend + auth
- Requires: Privacy lawyer review (GDPR barn-data)

---

## 📱 PWA Installation

Brukere kan legge Skifteboksen på hjemmeskjermen:

**iOS**:
1. Åpne app i Safari
2. Trykk Del → Legg til på hjemmeskjermen

**Android**:
1. Åpne app i Chrome
2. Meny → Installer app

---

## 🌐 SEO Optimization

Hver side inkluderer:
- Semantisk HTML (`<header>`, `<main>`, `<section>`)
- Open Graph metadata
- Structured data (FAQ schema)
- Canonicals
- `lang="nb"` for norsk språk

**Target search terms**:
- "hva pakke barnehage vinter"
- "klær barn minus 10"
- "barnehage utstyrsliste"
- "aktiviteter barn sommer Norge"

Bruk Google Search Console for å spore rankings.

---

## 🛠️ Troubleshooting

### "GitHub Action feiler"
1. Gå til GitHub repo → Settings → Actions
2. Velg "Allow all actions"
3. Retry deployment

### "Azure finner ikke filene"
1. Sjekk at `index.html`, `style.css`, `app.js` ligger i **root** av repo
2. Kjør `git status` og bekreft de er committed

### "localStorage virker ikke"
- Sikre at du åpner over HTTPS (eller localhost)
- Check i DevTools → Application → Local Storage

---

## 📞 Support & Feedback

**For ideer til v2/v3**:
- Åpne en GitHub issue
- Kontakt jj på Twitter/Bluesky

**For bug-reports**:
- GitHub issues med screenshot + stegene for å reprodusere

---

## 📜 Lisens

MIT – bruk fritt for kommersiell eller privat bruk.

---

## 👥 Credits

**Laget av**: jj (Stavanger, Norge)  
**Inspirasjon fra**: Echte foreldre i barnehagen  
**Kildedata**: ohdearbaby.no, foreldresiden.no, babyverden.no

---

**Versjon**: 1.0 • **Status**: Pilot Telemark • **Sist oppdatert**: Juni 2026
