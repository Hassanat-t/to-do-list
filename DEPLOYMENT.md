# DEPLOYMENT.md – Deploying the To-Do App to Vercel

This app is a **static SPA** (Vite + React + TypeScript) that keeps all state in `localStorage`.
That means no backend, no database and **no environment variables** are required on Vercel.

- Build command: `npm run build` (`tsc && vite build`)
- Output directory: `dist/`
- Node.js: `22.x` (pinned via `engines#node` in `package.json`; Vercel supports `24.x`, `22.x`, `20.x`)
- Routing: handled by `vercel.json` (see below)

## 1. Prerequisites

1. Node.js 22.x locally (`node -v` → `v>=22.12`) – Vite 8 requires `^20.19.0 || >=22.12.0`.
2. A Vercel account (Hobby/free tier is enough) – <https://vercel.com/signup>.
3. Code pushed to GitHub: `https://github.com/Hassanat-t/to-do-list` (branch `main`).

## 2. Option A – Deploy from the Vercel Dashboard (recommended)

1. Make sure the latest commit is pushed:
   ```bash
   git push origin main
   ```
2. Go to <https://vercel.com/new>.
3. **Import Git Repository** → pick `Hassanat-t/to-do-list` (authorize the GitHub app if asked).
4. In the configuration screen, confirm the auto-detected settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Environment Variables**: none
   - **Root Directory**: `./` (repository root)
5. Click **Deploy**. The first build takes ~1 minute.
6. Vercel returns a production URL such as `https://to-do-list-<hash>.vercel.app`.

Every later `git push origin main` triggers a new production deployment; every pull request gets
its own **Preview Deployment** URL automatically.

## 3. Option B – Deploy from the Vercel CLI

```bash
# once, if the CLI is not installed yet
npm i -g vercel

vercel login     # interactive: choose GitHub/email and confirm
vercel           # first run: links the folder and creates a Preview deployment
vercel --prod    # promote to production
```

Useful flags:

| Command | Purpose |
| --- | --- |
| `vercel` | Preview deployment for the current working copy |
| `vercel --prod` | Production deployment |
| `vercel env ls` | Show project environment variables (none needed here) |
| `vercel logs <url>` | Inspect runtime/build logs |
| `vercel ls` | List recent deployments |
| `vercel inspect <url>` | Show build output and routing details |

Alternatively run it without a global install: `npx vercel@latest --prod`.

The first CLI run writes a local `.vercel/` folder (project link). It is machine-specific and is
already ignored by `.gitignore` conventions used here – do not commit it.

## 4. What `vercel.json` configures

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [ /* security headers + cache policy */ ]
}
```

| Key | Why it exists |
| --- | --- |
| `framework` / `buildCommand` / `outputDirectory` | Pins the build so it does not depend on dashboard auto-detection. |
| `cleanUrls` | Serves `/about` instead of `/about.html` and strips the `.html` extension. |
| `rewrites` | SPA fallback for `BrowserRouter`: deep links like `/?filter=active` or `/anything` are served `index.html` instead of a 404. Vercel evaluates **File System Routes before Rewrites**, so `dist/assets/*` files are still served directly. |
| `/assets/(.*)` header | `Cache-Control: public, max-age=31536000, immutable` – Vite filenames are content-hashed (`index-CVajB-lx.js`), so they are safe to cache forever. |
| `/index.html` header | `max-age=0, must-revalidate` so users always get the newest asset references. |
| Security headers | `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` for every response. |

## 5. Post-deploy verification checklist

1. `GET https://<your-app>.vercel.app/` → 200 and the task input is rendered.
2. Refresh on a deep link (e.g. `https://<your-app>.vercel.app/some/deep/link`) → still 200, no 404.
3. Assets: `curl -I https://<your-app>.vercel.app/assets/index-*.js` → `cache-control: public, max-age=31536000, immutable`.
4. Add / toggle / delete a task, switch filters, reload the page → tasks persist (localStorage).
5. Vercel → Project → **Deployments** → the build log shows `tsc && vite build` finishing without errors.

## 6. Optional follow-ups

- **Custom domain**: Project → Settings → Domains → add your domain and follow the DNS entries.
- **Hobby plan note**: Hobby is for non-commercial use; upgrade to Pro for commercial traffic.
- **CI parity**: run `npm run build` locally before pushing – the deploy fails if `tsc` reports errors.
- **Local production smoke test**: `npm run build && npm run preview`.

## 7. Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| Build fails with "Cannot find module 'react-router-dom'" | Dependencies not installed/lockfile out of sync → run `npm ci`, commit `package-lock.json`. |
| Build fails with an engine error | Node version mismatch → `package.json` pins `engines.node` to `22.x`; keep it in a supported list (`24.x`, `22.x`, `20.x`). |
| 404 after refreshing a sub-path | The `rewrites` entry in `vercel.json` was removed or overridden by dashboard routing rules. |
| Old JS/CSS served after a deploy | `/assets` should only be immutable because filenames are hashed; if the hash was removed, drop the immutable header. |
| Blank page on the deployed URL | Check the browser console for a failed `/assets/...` request; usually caused by deploying with a custom `base` path in `vite.config.ts` (this project must keep the default `/`). |
