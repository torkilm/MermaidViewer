<div align="center">
<img src="https://github.com/user-attachments/assets/49a33dfd-8050-4b24-8c7d-41272d306e2e" alt="Mermaid Illustration" />
</div>

# Mermaid Studio

A mobile-first, ultra-lightweight Mermaid diagram renderer. Easily edit, view, and export high-resolution PNG diagrams directly from your mobile device.

**Live Demo:** https://torkilm.github.io/MermaidViewer/

View your app in AI Studio: https://ai.studio/apps/drive/1alEgdXsFG-IZhULnr0glwdPtwAgTs137

## Features

- 📱 **Mobile-first design** - Works seamlessly on all devices
- ✏️ **Live editor** with syntax highlighting for Mermaid diagrams
- 🔍 **Interactive viewer** with zoom and pan controls
- ⌨️ **Keyboard shortcuts** for efficient navigation
- 🖱️ **Mouse wheel zoom** - Scroll to zoom in/out
- 📥 **Export options** - Download as PNG or SVG
- 🔗 **Share functionality** - Share diagrams via Facebook, LinkedIn, Twitter, or copy link
- 💾 **Auto-save** - Your work is saved locally in your browser

## Keyboard Shortcuts

### Editor
- `Ctrl+Z` / `Cmd+Z` - Undo
- `Ctrl+Shift+Z` / `Cmd+Shift+Z` - Redo
- `Ctrl+Y` / `Cmd+Y` - Redo (alternative)

### Viewer
- `+` or `=` - Zoom in
- `-` or `_` - Zoom out
- `0` - Reset zoom and center diagram
- `↑` `↓` `←` `→` - Pan the diagram using arrow keys
- **Mouse wheel** - Scroll up/down to zoom in/out
- **Click and drag** - Pan the diagram with mouse

## Sharing Diagrams

### URL Sharing
Your diagrams are automatically encoded in the URL, making sharing simple and seamless:

1. **Create or edit your diagram** - The URL updates automatically as you work
2. **Copy the link** - Click the link icon (🔗) in the footer to copy the shareable URL
3. **Share anywhere** - Send the URL via email, chat, or use the social media buttons
4. **No account needed** - Recipients can view your diagram instantly without signing up

The diagram data is encoded in the URL hash (the part after `#`), so:
- ✅ Works completely offline once loaded
- ✅ No data sent to any server
- ✅ Privacy-friendly - your diagrams never leave your device
- ✅ Perfect for collaboration and documentation

### Social Media Sharing
Use the built-in share buttons in the footer:
- 📘 **Facebook** - Share on your timeline or in groups
- 💼 **LinkedIn** - Share with your professional network
- 🐦 **Twitter** - Tweet your diagram

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
