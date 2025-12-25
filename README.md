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

This app is configured to deploy to GitHub Pages automatically when changes are pushed to the `main` branch. The deployment workflow:

1. Builds the application using `npm run build`
2. Uploads the built artifacts to GitHub Pages
3. Deploys to https://torkilm.github.io/MermaidViewer/

To enable GitHub Pages for your fork:
1. Go to your repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to the `main` branch to trigger the deployment
