# BuyNorwaButton – Next.js komponent

Denne knappen lar brukere kjøpe NORWA Coin direkte med ETH via din NorwaSale-kontrakt.

## Bruk:
1. Kopiér `BuyNorwaButton.tsx` til `components`-mappen i prosjektet ditt.
2. Installer `ethers`:
   ```bash
   npm install ethers
   ```
3. Bytt ut `SALE_ADDRESS` i filen med adressen til din NorwaSale-kontrakt.
4. Importér knappen i `app/page.tsx` (eller ønsket side):
   ```tsx
   import BuyNorwaButton from '@/components/BuyNorwaButton';
   <BuyNorwaButton />
   ```
5. Deploy prosjektet på nytt.

Knappen vil be brukeren koble til MetaMask, sikre at de er på Ethereum mainnet, og sende ETH til kontrakten.
