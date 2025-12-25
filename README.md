<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Mermaid Go

A mobile-first, ultra-lightweight Mermaid diagram renderer. Easily edit, view, and export high-resolution PNG diagrams directly from your mobile device.

**Live Demo:** https://torkilm.github.io/MermaidViewer/

View your app in AI Studio: https://ai.studio/apps/drive/1alEgdXsFG-IZhULnr0glwdPtwAgTs137

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment

This app is configured to deploy to GitHub Pages automatically when changes are pushed to the `main` branch.

### Initial Setup (Required)

**Before the deployment will work, you must enable GitHub Pages:**

1. Go to your repository **Settings** → **Pages**
2. Under "Source", select **"GitHub Actions"**
3. Save the settings

### Deployment Process

Once GitHub Pages is enabled, the workflow will:

1. Build the application using `npm run build`
2. Upload the built artifacts to GitHub Pages
3. Deploy to https://torkilm.github.io/MermaidViewer/

The deployment is triggered automatically on:
- Push to the `main` branch
- Manual trigger via the Actions tab

### Troubleshooting

If you see a 404 error:
- Verify GitHub Pages is enabled (Settings → Pages)
- Check that Source is set to "GitHub Actions"
- Review the workflow run in the Actions tab for any errors
- Ensure the workflow has completed successfully
