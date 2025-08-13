# NORWA Tailwind Fix Patch

This patch restores Tailwind CSS so Vercel can build.

## Included
- package.json (adds Tailwind, PostCSS, Autoprefixer, TypeScript types)
- tailwind.config.js
- postcss.config.js

## How to use
1. Upload all files in this zip to the ROOT of your GitHub repo.
2. Commit changes.
3. Vercel will rebuild without the Tailwind error.

Ensure your app/globals.css has:
@tailwind base;
@tailwind components;
@tailwind utilities;
