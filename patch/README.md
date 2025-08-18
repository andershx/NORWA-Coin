# NORWA Website: Switch to English + Solana Patch

This drop-in patch helps you:
1) Switch all on-site copy to English (via a simple i18n layer + placeholders).
2) Replace "Ethereum/ETH" mentions with "Solana/SOL" (including "ETH cashback" → "SOL cashback").
3) Provide a minimal chain config for Solana (RPC, explorer, ticker), which you can import where you configure chains/network.

> ⚠️ Since I don’t have your repo, I can’t rewrite hard-coded Norwegian sentences for you automatically.  
> You’ll get **English placeholders** for common sections and a find/replace script to flip ETH→SOL.  
> You can then fine-tune the English copy in `locales/en/common.json` or your own content files.

---

## How to use

### 0) Create a new branch
```bash
git checkout -b feat/english-solana
```

### 1) Drop these files in your repo
Copy the contents of the `patch/` folder into the root of your website repo, preserving structure.  
Nothing here overwrites existing files unless you choose to merge them.

### 2) Run the replacement script (ETH→SOL)
From the repository root:
```bash
bash scripts/convert_to_solana.sh
```
This will scan typical web source files and replace:
- `Ethereum` → `Solana`
- `ETH` → `SOL` (safe-guarded so it won’t touch words like `METHOD`)
- `ETH cashback` → `SOL cashback`
- `ERC-20` → `SPL`

> The script prints a summary of changed files. Review the diff afterwards.

### 3) Wire up English content (if using React/Next.js)
If your site is React/Next.js, you can use the provided **very small** i18n helper:

- Import `i18n/provider` at your app root (e.g., `_app.tsx` or `app/layout.tsx`):
```tsx
import { I18nProvider } from "./i18n/provider";
import en from "./locales/en/common.json";

export default function App({ Component, pageProps }) {
  return (
    <I18nProvider messages={en} defaultLocale="en">
      <Component {...pageProps} />
    </I18nProvider>
  );
}
```

- Replace any hard-coded text with `<T k="some.key" />` or `t("some.key")`:
```tsx
import { T, useT } from "./i18n/provider";

export default function Hero() {
  const t = useT();
  return (
    <section>
      <h1><T k="hero.title" /></h1>
      <p>{t("hero.subtitle")}</p>
      <a href="#buy"><T k="cta.buy" /></a>
    </section>
  );
}
```

Edit the English strings in `locales/en/common.json` until everything reads correctly.  
If you already have an i18n system, just **merge** the keys/values from `locales/en/common.json` into your system.

### 4) Point your code to Solana chain config
Import `config/chain.config.json` wherever your app sets network defaults.
Example (TypeScript):
```ts
import chain from "./config/chain.config.json";

console.log(chain.network);     // "solana"
console.log(chain.symbol);      // "SOL"
console.log(chain.explorer);    // "https://solscan.io"
console.log(chain.rpc);         // update this to your preferred RPC
```

### 5) Commit and push
```bash
git add .
git commit -m "Switch site to English and Solana (replace ETH→SOL)"
git push origin feat/english-solana
```

### 6) Review & QA
- ✅ All “Ethereum/ETH/erc-20” mentions replaced with “Solana/SOL/SPL”
- ✅ All “ETH cashback” now reads “SOL cashback”
- ✅ Navigation, hero, sections show English text
- ✅ Network config, wallet connect copy, token details updated
- ✅ Links to explorers point to **Solana** (e.g., solscan.io) instead of Etherscan

---

## What’s inside

```
patch/
├── config/
│   └── chain.config.json
├── locales/
│   └── en/
│       └── common.json
├── i18n/
│   └── provider.tsx
└── scripts/
    └── convert_to_solana.sh
```

- `config/chain.config.json` → minimal Solana network defaults
- `locales/en/common.json` → English placeholders for common site sections
- `i18n/provider.tsx` → tiny i18n layer for React/Next (Context + hooks)
- `scripts/convert_to_solana.sh` → safe search/replace to convert ETH→SOL mentions in your code/content

If you need a variant for non-React stacks (plain HTML, SvelteKit, Vue), keep the script and `config/` as-is and just **copy/paste** strings from `locales/en/common.json` into your templates.
