# Fashionz

A responsive fashion e-commerce front-end and API. Built with HTML5, CSS3, and vanilla JavaScript (frontend) and Node.js/Express/SQLite (backend), inspired by [Zay Shop (TemplateMo 559)](https://templatemo.com/templates/templatemo_559_zay_shop/).

## Project structure

- **frontend/** – Static site
  - `index.html`, `shop.html`, `product.html`, `cart.html`, `login.html`
  - `assets/css/styles.css` – Styles
  - `assets/js/main.js`, `api.js`, `auth.js`, `analytics.js`, `state.js`
  - `assets/images/` – Images
- **backend/** – API server
  - `server.js` – Express app, CORS, routes
  - `routes/` – product, auth, order, cart
  - `controllers/`, `services/`, `middleware/`, `db/`, `models/`

## Run locally

**You need Node.js installed** ([nodejs.org](https://nodejs.org)).

1. Install backend dependencies (once). From project root: `cd backend` then `npm install`.
2. Seed the database (once): in `backend` run `npm run seed`. Test user: **test@fashionz.com** / **password123**
3. Start the app. From **project root**: `npm start`. Or from `backend`: `node server.js`
4. Open [http://localhost:5000](http://localhost:5000) in your browser. The server serves both API and frontend.

**If something fails:** "npm is not recognized" → install Node.js and restart the terminal. "Cannot find module" → run `npm install` in `backend`. Port in use → set `PORT=3000` in `backend/.env`. Products/login don't work → run `npm run seed` in `backend`.

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/products | List products (query: `category`, `limit`) |
| GET | /api/products/:id | Single product |
| POST | /api/auth/login | Login (body: `email`, `password`) → `{ token, user }` |
| GET | /api/auth/me | Current user (auth required) |
| POST | /api/cart | Add to cart (auth required; body: `productId`, `quantity`) |
| GET | /api/cart | Get cart (auth required) |
| POST | /api/orders | Create order (auth required; body: `{ items: [{ productId, quantity }] }` or empty to use server cart) |

Use the token in the header: `Authorization: Bearer <token>`.

## Replacing images

Frontend pages use placeholder image URLs (e.g. Unsplash). To use your own assets, add files under `frontend/assets/images/` and update the `background-image` or `src` URLs in the HTML/JS to point to those paths.
