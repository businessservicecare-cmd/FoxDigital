# FoxDigital Services Website + Dashboards

Multi-page digital marketing agency website for **FoxDigital Services** with:

- Public pages: Home, Services, About, Process, Contact
- Admin portal: login + dashboard to view contact form submissions and create/update client reports
- Client portal: login + dashboard to view campaign metrics, graph, downloadable report (PDF/DOC), and submit comments

## Demo credentials

- **Admin**: `admin@foxdigital.com` / `admin123`
- **Client**: `client-demo` / `client123`

## Run locally

```bash
python3 -m http.server 4173
```

Open:
- `http://localhost:4173/index.html`
- `http://localhost:4173/admin-login.html`
- `http://localhost:4173/client-login.html`

## Notes

This is a static front-end implementation. Data is persisted in browser `localStorage`.
