# Fanable Section (Yellow Gradient, Animated)

This is a drop‑in component that adds a styled **Fanable partner** section with a yellow gradient and subtle animations. The whole card is clickable and opens **https://fanable.io** in a new tab.

## Files
- `components/FanableSection.tsx`
- `public/fanable-logo.png` (placeholder — replace with official logo when you have it)

## Add to your homepage (one line)
Open your homepage file (usually `app/page.tsx`) and add:

```tsx
import FanableSection from '@/components/FanableSection';
```

Then render it where you want it to appear (for example, near the bottom):

```tsx
<FanableSection />
```

That’s it—no other setup required.
