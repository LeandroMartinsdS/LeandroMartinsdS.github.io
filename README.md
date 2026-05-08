# LeandroMartinsdS.github.io

Project structure:

- `index.html`: public homepage entry point for GitHub Pages, using the editorial layout
- `assets/css/`: shared stylesheets for the main page and alternate versions
- `assets/js/site-content.js`: shared data source for profile content used by all variants
- `assets/js/site-render.js`: shared render helpers that map content to each layout
- `assets/images/`: optional images such as `portrait.jpg`
- `assets/qr/`: generated QR codes for local and public URLs
- `scripts/`: helper script for preview server

Local preview:

- Run `./scripts/check-node-npm.sh`
- Run `./scripts/serve-site.sh`
- Open `http://localhost:3000/`
