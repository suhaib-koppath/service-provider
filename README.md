# Thumbly.in — Local Services Marketplace

A responsive React and Tailwind CSS app with a local-services marketplace and the existing splash, login, registration, and password-reset screens.

## Project structure

```text
src/
  components/  Reusable interface elements
  pages/       Page-level layouts
  utils/       Shared hooks, helpers, and React Router route definitions
  assets/      Static assets
```

Tailwind's `dark:` utilities are enabled using the `dark` class on the document root. Add color variants directly to elements, for example `text-slate-800 dark:text-white`.

React Router is mounted with `BrowserRouter` in `src/main.jsx`. Route definitions live in `src/utils/routes.jsx`; use `Link` for internal navigation.

## Pages

- `/` — Existing splash screen, then the existing login screen
- `/home` — Marketplace home
- `/services` — Searchable, filterable service directory
- `/services/:slug` — Service details and sample local provider contact links
- `/about`, `/contact`, `/become-provider`
- `/faq`, `/reviews`, `/terms`, `/privacy`
- Unknown paths — Marketplace not-found page
- `/register` — Create an account
- `/forgot-password` — Request a password reset
- `/admin/login` — Separate demo admin sign-in
- `/admin` — Admin dashboard
- `/admin/:section` — Admin management modules (categories, subcategories, services, employees, providers, bookings, customers, reviews, locations, website content, settings, and activity)

The authentication forms remain UI-only and need an authentication/OAuth provider to handle real sign-in, registration, and password reset requests. Marketplace listings and provider details are explicitly sample data in `src/data/services.js`. Contact, newsletter, and provider forms validate in the browser but are not sent or saved; the demo does not include booking or payment APIs.

For a local UI walkthrough, sign in with `neighbor@namma.demo` / `Neighbor123!`. The demo session is kept in browser local storage and can be ended from the marketplace profile menu. This is demonstration-only authentication, not a secure account system; do not use real or sensitive credentials.

The admin demo uses `admin@namma.demo` / `NammaAdmin123!`. Admin data is seeded from `src/data/services.js`, then CRUD changes are stored only in this browser's local storage and shared with the public catalog in the same browser. Use **Reset demo data** in admin Settings to restore the seed state. This project has no backend, database, API, or server-side RBAC; the admin login and route guard are for UI demonstration only and do not protect production data.

## Development

```sh
npm install
npm run dev
```

Use `npm run lint` to check the code and `npm run build` to create a production build.
