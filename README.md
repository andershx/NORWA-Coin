# NORWA Buy Button Patch

Denne patchen gjør to ting:
1. Legger til `ethers` i `package.json` slik at Vercel kan bygge.
2. Flytter `BuyNorwaButton.tsx` til `components/`-mappen.

## Bruk:
1. Pakk ut ZIP-filen.
2. Last opp `package.json` og `components/BuyNorwaButton.tsx` til roten av GitHub-prosjektet ditt (overskriv hvis nødvendig).
3. Commit og push.
4. Vercel vil bygge prosjektet med knappen.

Husk å bytte ut `SALE_ADDRESS` i `components/BuyNorwaButton.tsx` med adressen til din NorwaSale-kontrakt.
