# NORWA package.json fix

This file adds the missing dependencies so your Vercel build succeeds:

- `stripe`
- `@vercel/kv`

## How to use
1) Place `package.json` from this folder at the **root** of your repo (replace the existing `package.json`).
2) Commit & push — Vercel will install the dependencies and build.

> If you had custom scripts or extra deps in your old package.json, copy them back into this one before committing.
