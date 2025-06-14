# Min Kryptovaluta-Portfölj

Ett enkelt webbverktyg för att hålla koll på din kryptoportfölj, visa prisgrafer och få investeringsråd från OpenAI. Byggt med Next.js, React, och CoinGecko API.

## Funktioner

- Lägg till flera kryptovalutor i din portfölj
- Ange inköpspris och mängd
- Visa aktuellt värde samt vinst/förlust (P/L)
- Se 7-dagars grafer med prisutveckling
- Få AI-råd via OpenAI (Köp / Sälj / Håll)
- LocalStorage används för att spara data lokalt

---

## Teknisk stack

- **Next.js** (App Router-struktur)
- **React** (komponentbaserad UI)
- **Node.js** (för serverside API-routes)
- **Chart.js** med `react-chartjs-2` för grafer
- **CoinGecko Demo API** för kryptomarknadsdata
- **OpenAI API** för investeringsrekommendationer

---

### Varför valde vi React?

Vi valde React som bibliotek för detta projekt eftersom det 
erbjuder en balanserad kombination av flexibilitet, 
stort ekosystem och aktiv community. 
Här är en jämförelse mot andra populära ramverk:

Angular
Fördelar: Komplett ramverk, TypeScript som standard, bra för enterprise-appar, stark struktur
Nackdelar: Brant inlärningskurva, tungt för små projekt, komplex syntax
https://ellow.io/react-js-vs-other-front-end-frameworks-why-react-js-is-best

Vue
Fördelar: Enkel syntax, lätt att förstå, snabb att komma igång, bra dokumentation
Nackdelar: Mindre community än React och Angular, färre stora företag som använder det, viss risk för fragmentering
https://ellow.io/react-js-vs-other-front-end-frameworks-why-react-js-is-best

React
Fördelar: Komponentsystem, stort ekosystem, stöd i Next.js, flexibelt, lätt att komma igång, bra prestanda med virtuell DOM
Nackdelar: Kräver externa bibliotek för routing och state management, kan bli rörigt utan struktur, JSX kan kännas ovant
https://ellow.io/react-js-vs-other-front-end-frameworks-why-react-js-is-best

### Kom igång

### 1. Klona projektet
```bash
git clone https://github.com/Peppino9/trading_ai.git
cd trading_ai
```
---

### 2. Installera beroenden
```bash
npm install
```

### 3. Skapa en .env.local fil i rotmappen.
Lägg in API nycklarna.
```bash
NEXT_PUBLIC_COINGECKO_API_KEY=din-cg-api-nyckel
OPENAI_API_KEY=din-openai-api-nyckel
```

Registrera dig och skapa api nycklar om du inte har: <br>
Coingecko: https://www.coingecko.com/sv/api <br>
OpenAI: https://platform.openai.com/signup

### 4. Starta 
```bash
npm run dev
```
Öppna http://localhost:3000 i webbläsaren.
