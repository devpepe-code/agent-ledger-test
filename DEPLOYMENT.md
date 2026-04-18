# Deployment

## Vercel (recommended)

1. Push the `agent-ledger` directory as a GitHub repository (or monorepo root with **Root Directory** set to `agent-ledger` in Vercel).
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. **Framework**: Next.js (auto-detected).
4. **Build**: `npm run build` — **Install**: `npm install` or `npm ci`.
5. **Node**: 20.x.

### Environment variables

Set in **Project → Settings → Environment Variables** (Production + Preview as needed):

| Variable | Required | Notes |
|----------|----------|--------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Strongly recommended | Real ID for WalletConnect in production |
| `NEXT_PUBLIC_APP_URL` | Recommended | `https://your-domain.vercel.app` or custom domain (no trailing slash) |
| `NEXT_PUBLIC_APP_ENV` | Optional | `production` in prod |
| `NEXT_PUBLIC_BASE_RPC_URL` | Optional | Default `https://mainnet.base.org` |
| `NEXT_PUBLIC_BASESCAN_URL` | Optional | Default `https://basescan.org` |
| `NEXT_PUBLIC_IPFS_GATEWAY` | Optional | Default `https://ipfs.io/ipfs` |
| `NEXT_PUBLIC_DEMO_MODE` | Optional | Default on unless set to `false` |
| `NEXT_PUBLIC_ENABLE_REAL_WALLET` | Optional | Default on unless set to `false` |

Vercel sets `VERCEL_URL`; `lib/env.ts` uses it to infer `appUrl` when `NEXT_PUBLIC_APP_URL` is unset (useful for previews).

### Custom domain

Add the domain under **Settings → Domains**, update DNS per Vercel, then set `NEXT_PUBLIC_APP_URL` to that domain for correct Open Graph / links.

### Health check

After deploy:

```bash
curl -sS "https://YOUR_DOMAIN/health"
```

Expect JSON `status: "ok"` and optional `envIssues` for misconfiguration hints.

## GitHub Actions

`.github/workflows/ci.yml` runs `tsc`, `lint`, and `build` on pushes/PRs to `main` / `develop`. Set a repository secret `WALLETCONNECT_PROJECT_ID` if you want the future workflow to use a real project ID (currently CI uses a placeholder for deterministic public builds).

## Static SEO files

`public/robots.txt` and `public/sitemap.xml` use placeholder host `https://agentledger.example.com`. Replace with your production origin before launch, or generate sitemaps dynamically in a later iteration.

## Security

Never commit `.env.local` or API secrets. Run before commit:

```bash
git diff --cached | grep -iE "api.key|apikey|secret|password|token|private|sk_live|pk_live"
```
