# Retro Macro Tracker

A web version of your macro tracker (React + Vite + Tailwind), set up to
auto-deploy to GitHub Pages and install on your iPhone home screen like an app.

## 1. Push this to GitHub

1. On github.com, create a new **empty** repo (no README/gitignore), e.g. `macro-tracker`.
2. On your machine, in this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

## 2. Turn on GitHub Pages

1. In the repo on GitHub: **Settings → Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**.
3. That's it — the workflow in `.github/workflows/deploy.yml` will build and
   deploy automatically on every push to `main`. Check the **Actions** tab
   for progress; when it's green, your app is live at:
   `https://<your-username>.github.io/<repo-name>/`

## 3. Add it to your iPhone home screen

1. Open the URL above in **Safari** on your iPhone (must be Safari, not Chrome).
2. Tap the **Share** icon → **Add to Home Screen**.
3. It'll launch full-screen with no browser bar, like a real app.

## Notes

- All your data (meals, goals, streaks, custom foods) is saved in the
  browser's `localStorage` — it lives on that one device/browser only, isn't
  synced anywhere, and clearing Safari's site data will wipe it.
- To make changes later: edit `src/App.tsx`, commit, and push — it redeploys
  automatically.
- To test locally first: `npm install` then `npm run dev`.
