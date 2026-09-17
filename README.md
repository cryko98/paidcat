# PAIDCAT — $PAIDCAT

Official website for **PaidCat**, a memecoin on Solana, fair launched on pump.fun.

Static site — plain HTML, CSS and JS. No build step, no dependencies.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole page |
| `styles.css` | Styling |
| `script.js` | Config + interactions (copy CA, menu, animations) |
| `logo.jpg` | Logo, favicon and social share image |

## Updating the links

Everything you need to change lives at the top of `script.js`:

```js
const CONFIG = {
  contract: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // real mint address
  telegram: "https://t.me/paidcatonsol",         // Telegram group
  pump: "https://pump.fun",                      // e.g. "https://pump.fun/coin/<contract>"
};
```

- `contract` fills both contract-address boxes and the copy buttons.
- If `telegram` is left empty, the Telegram buttons show a "coming soon" toast instead of navigating.

## Local preview

Open `index.html` in a browser, or run:

```bash
npx serve .
```

## Deploy (Vercel)

Import the repo on Vercel and deploy with the default settings — framework preset **Other**, no build command, output directory `.`.

## Disclaimer

$PAIDCAT is a meme coin made for entertainment. It has no intrinsic value and no guaranteed returns. Nothing here is financial advice.
