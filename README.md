# 💸 Min Kryptovaluta-Portfölj

Ett enkelt webbverktyg för att hålla koll på din kryptoportfölj, visa prisgrafer och få investeringsråd från OpenAI. Byggt med Next.js, React, och CoinGecko API.

## 📸 Funktioner

- Lägg till flera kryptovalutor i din portfölj
- Ange inköpspris och mängd
- Visa aktuellt värde samt vinst/förlust (P/L)
- Se 7-dagars grafer med prisutveckling
- Få AI-råd via OpenAI (Köp / Sälj / Håll)
- LocalStorage används för att spara data lokalt

---

## 🛠️ Teknisk stack

- **Next.js** (App Router-struktur)
- **React** (komponentbaserad UI)
- **Node.js** (för serverside API-routes)
- **Chart.js** med `react-chartjs-2` för grafer
- **CoinGecko Demo API** för kryptomarknadsdata
- **OpenAI API** för investeringsrekommendationer

---

### Kom igång

### 1. Klona projektet
*bash*
git clone https://github.com/Peppino9/trading_ai.git
cd crypto-portfolio-tracker
---

### 2. Installera beroenden
*bash*
npm install

### 3. Skapa en .env.local fil i rotmappen.
NEXT_PUBLIC_COINGECKO_API_KEY=din-demo-api-nyckel
OPENAI_API_KEY=din-openai-api-nyckel

Registrera dig och skapa api nyckel:
	•	https://www.coingecko.com/sv/api
	•	https://platform.openai.com/signup

### 4. Starta 
*bash*
npm run dev

Öppna http://localhost:3000 i webbläsaren.
