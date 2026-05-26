# UpLoL ReadMe

UpLoL is a full stack web application based off of League of Legends. So far there are some rudimentary features. There is auth flow, so you can create an account and log in. Then there is the champions page, displaying all League of Legends champions as of today (27/05/2026). There's also a detailed view of specific champion information. There's also the bravery function - Giving you a random champion and 6 random items at the press of a button with a nice view.

## Motivation

The first time i played League of Legends i was 9 or 10 years old, today i am 23. I have had a great time playing this game over and over, and this is what ultimately lead me to create this application. So far im pretty proud of what i have accomplished, and i hope this project doesn't vanish into thin air.

## Features

- User signup and login
- Session-based authentication
- Protected routes
- Admin authorization
- Admin dashboard for viewing and deleting users
- Profile page
- Change password
- Delete account
- Forgot password and reset password by email
- Champion overview
- Champion detail pages
- Favorite champions
- Random champion/item generator
- Online users counter with Socket.IO
- Privacy policy / GDPR information

## Tech Stack:

### Frontend

- Svelte
- Vite
- Svelte5 Router
- Tailwind CSS
- Fetch API
- Socket.IO Client

### Backend

- Node.js
- Express
- PostgreSQL
- Socket.IO
- express-session
- bcryptjs
- Helmet
- express-rate-limit
- Resend for emails


