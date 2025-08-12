# NORWA – Ethereum sale bundle (1 ETH = 10,000 NORWA)

Dette er en ferdig pakke med:
- `contracts/NORWA.sol` – ERC‑20 token (1 mrd premint til deployer)
- `contracts/NorwaSale.sol` – enkel ETH‑salgskontrakt
- `frontend-snippet/BuyNorwaButton.tsx` – Next.js‑knapp for å sende ETH til salget

## 1) Deploy på Ethereum mainnet (Remix + MetaMask)
1. Gå til https://remix.ethereum.org
2. I Remix: `File explorer` → Opprett to filer i samme mappe:
   - `NORWA.sol` (lim inn innholdet fra `contracts/NORWA.sol`)
   - `NorwaSale.sol` (lim inn innholdet fra `contracts/NorwaSale.sol`)
3. I `Remix → Solidity compiler`: velg versjon `0.8.20` (eller senere 0.8.x) → **Compile** begge.
4. I `Remix → Deploy & run transactions`:
   - Velg `ENVIRONMENT: Injected Provider - MetaMask` og nettverk **Ethereum**.
   - Deploy `NORWA` først. Adresse (kopiér etter deploy) kalles **NORWA_ADDRESS**.
   - Deploy `NorwaSale` med constructor:
     - `_norwa`: **NORWA_ADDRESS**
     - `_tokensPerEth`: `10000 * 10^18` = **10000000000000000000000**
       (Dette gir 1 ETH = 10,000 NORWA)
   - Etterpå: Overfør f.eks. `10_000_000 * 10^18` NORWA fra din adresse til **NorwaSale**‑kontrakten (lageret den selger fra).

## 2) Legg inn kjøpsknappen i Next.js‑nettsiden
1. Kopiér `frontend-snippet/BuyNorwaButton.tsx` inn i prosjektet ditt, f.eks. `components/BuyNorwaButton.tsx`.
2. Installer `ethers` i prosjektet (hvis du ikke har det):
   ```bash
   npm install ethers
   ```
3. Åpne filen og bytt ut `0xYOUR_SALE_CONTRACT_ADDRESS` med adressen til din **NorwaSale**.
4. Importér og plasser knappen der du vil i `app/page.tsx` (eller tilsvarende):
   ```tsx
   import BuyNorwaButton from '@/components/BuyNorwaButton';
   // ...
   <BuyNorwaButton />
   ```
5. Commit til GitHub → Vercel bygger automatisk.

## 3) Admin (pris/pause/uttak)
- `setPrice(uint256 newPrice)` – oppdater pris (tokens per 1 ETH, skalert til 1e18).
- `setPaused(bool)` – pause salg ved behov.
- `withdrawAllETH()` – trekk ut samlet ETH.
- `withdrawTokens(amount)` – hent tilbake eventuelle NORWA fra salget.

## Viktige hensyn
- Dette er en **enkel** demo. Få alltid en uavhengig **audit** før større volum.
- RWA i USA kan anses som **verdipapir** – snakk med advokat for compliance.
- Du betaler **gas** ved deploy/overføringer. Sørg for at MetaMask har ETH.
