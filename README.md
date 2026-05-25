# SafarGo Project Report

## 1. Overview
SafarGo is a travel booking web application built with a React frontend and a Python Flask backend. The app provides:
- public marketing pages
- destination browsing
- destination detail pages
- contact form submission
- admin dashboard for managing destinations and contact inquiries

## 2. Technology Stack

### Frontend
- React 19
- Vite 4
- React Router DOM 7
- lucide-react for icons
- CSS component stylesheets for styling

### Backend
- Flask 3.0.2
- Flask-Cors 4.0.0
- pymongo 4.6.2
- python-dotenv 1.0.1
- MongoDB database

### Tooling
- ESLint
- Vite
- npm scripts:
  - `dev` for development
  - `build` for production build
  - `preview` for previewing build output
  - `lint` for ESLint checks

## 3. Architecture

### Frontend Structure
- `src/App.jsx`: Router and layout wrapper
- `src/components/`: shared UI components
  - `Navbar.jsx`
  - `Footer.jsx`
  - `Hero.jsx`
  - `DestinationCard.jsx`
  - `ScrollToTop.jsx`
- `src/pages/`: route pages
  - `Home.jsx`
  - `Destinations.jsx`
  - `DestinationDetail.jsx`
  - `About.jsx`
  - `Contact.jsx`
  - `Admin.jsx`

### Backend Structure
- `backend/app.py`: Flask API server
- `backend/seed.py`: database seed script
- `backend/requirements.txt`: Python dependencies

### Database Collections
- `destinations`
- `contacts`

## 4. Data Flow and Workflow

### Public User Experience
1. User loads the site in the browser.
2. `Home` fetches destinations from `http://localhost:5000/api/destinations`.
3. `Destinations` displays all tours.
4. `DestinationDetail` loads details via `GET /api/destinations/:id_or_name`.
5. `Contact` posts contact submissions to `/api/contact`.

### Admin Workflow
1. Access `/admin` and login with hard-coded credentials (`admin` / `password`).
2. `AdminDestinations` can:
   - fetch destinations
   - create new destination via `POST /api/destinations`
   - update destination via `PUT /api/destinations/:id`
   - delete destination via `DELETE /api/destinations/:id`
3. `AdminContacts` can:
   - fetch contact submissions
   - delete messages via `DELETE /api/contact/:id`
   - add or update internal notes via `PUT /api/contact/:id`

### Backend API Behavior
- Destination list returned by `/api/destinations`
- Individual destination fetched by ID or title slug
- Contact form validation ensures required fields are present
- MongoDB `_id` values are converted to string `id`
- CORS enabled to support cross-origin frontend requests

## 5. Key Features

### Public Features
- Hero landing section with CTA buttons
- Featured destinations preview on home page
- Full destination listing
- Individual destination details page
- About page with brand mission
- Contact form with success and error feedback

### Admin Features
- Admin login page (frontend-only protection)
- Destination creation and editing modal form
- Destination deletion with confirmation
- Contact message list, refresh, and delete
- Admin internal notes for contact submissions

## 6. Important Notes
- Frontend uses `http://localhost:5000` for backend API calls.
- No Vite proxy configuration is present, so CORS is required.
- Admin auth is implemented on the client side only, not secure for production.
- `README.md` is currently the Vite template default and not project-specific.
- Destination details use a slug based on the destination title.

## 7. Setup Instructions

### Frontend
1. Run `npm install`
2. Run `npm run dev`

### Backend
1. Navigate to `backend`
2. Install requirements: `python -m pip install -r requirements.txt`
3. Seed the database: `python seed.py`
4. Start server: `python app.py`

### Database
- Default MongoDB URI: `mongodb://localhost:27017/`
- Environment variable: `MONGO_URI`

## 8. Improvement Opportunities
- Add secure backend authentication for admin access
- Move API base URL into environment variables or a config layer
- Add Vite proxy or unified dev server configuration
- Use TypeScript for stronger type safety
- Expand `README.md` with project-specific documentation
- Add form validation and user feedback consistency across all pages
