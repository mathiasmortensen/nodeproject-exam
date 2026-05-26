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

## Project Structure

```
│   .gitignore
│   .prettierrc
│   README.md
│
├───client
│   │   .env.example
│   │   .gitignore
│   │   index.html
│   │   jsconfig.json
│   │   package-lock.json
│   │   package.json
│   │   svelte.config.js
│   │   vite.config.js
│   │
│   ├───public
│   │       icon.png
│   │       leaguebackground.webp
│   │
│   └───src
│       │   app.css
│       │   App.svelte
│       │   main.js
│       │
│       ├───components
│       │       AdminGuard.svelte
│       │       AuthGuard.svelte
│       │       Footer.svelte
│       │       Navbar.svelte
│       │       OnlineUsers.svelte
│       │
│       ├───pages
│       │       AdminDashboard.svelte
│       │       Bravery.svelte
│       │       Champion.svelte
│       │       Champions.svelte
│       │       ForgotPassword.svelte
│       │       Home.svelte
│       │       Login.svelte
│       │       Privacy.svelte
│       │       Profile.svelte
│       │       ResetPassword.svelte
│       │
│       ├───services
│       │       admin.js
│       │       auth.js
│       │       champions.js
│       │       items.js
│       │
│       ├───stores
│       │       userStore.svelte.js
│       │
│       └───util
│               fetchHelper.js
│               toastrConfig.js
│
└───server
    │   .env.example
    │   app.js
    │   package-lock.json
    │   package.json
    │
    ├───db
    │       connection.js
    │       createDatabase.js
    │
    ├───middleware
    │       authMiddleware.js
    │
    ├───routers
    │       adminRouter.js
    │       authRouter.js
    │       favoritesRouter.js
    │
    └───util
            mailer.js
```

I have for the sake of this visualization left out the obvious Data Dragon files, that are located in the public folder the structure for that folder is this:

```
│   icon.png
│   leaguebackground.webp
│
└───ddragon
    │   champion.json
    │   item.json
    │
    ├───champion
          {championName.json}
          {championName.png}
    ├───passive
          {champNamePassive}
    ├───roles
    │       assassin.png
    │       favorites.png
    │       fighter.png
    │       mage.png
    │       marksman.png
    │       support.png
    │       tank.png
    │───spell
            {champNameSpell(Q, W, E, R)}
```

## Environment Variables

Create .env files based on the examples provided on github..

### client/.env

```env
VITE_BASE_URL=http://localhost:8080
```

### server/.env

```env
DB_USER=your_database_user
DB_HOST_NAME=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=5432

SESSION_SECRET=your_session_secret

RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_verified_sender_email

CLIENT_URL=http://localhost:5173

TEST_EMAIL=admin@example.com
TEST_USERNAME=adminuser
TEST_PASSWORD=adminpassword
```

## Installation

Install deps in both folder (client and server)

```bash
cd client
npm install

cd server
npm install
```

## Database Explanation and Setup

This project uses PostgreSQL

It is used for user- and favorite -data, because of its nature being relational, persistent data connected to accoiunts, and not the static data, because that will probably stay static. If i keep working on this project (which i probably will), because this will include more user features, like ratings or comments, and maybe even if i choose, i can store sessions on the database, if i ever run into performance problems...

If i planned on dropping the project as a whole, and to only work on it for the exam, the safest choice would've been SQLITE because of how easy and ready 2 use it is.

Enough.

Run the database setup script from the server folder:

```bash
cd server
node db/createDatbase.js
```

This creates two tables:

- users
- favorite_champions

If TEST_EMAIL, TEST_USERNAME, and TEST_PASSWORD are set in the env file, an admin user is created with the provided values.

## Running the project

I have made a script that builds the frontend when you're in the server directory.

To run the script simply do:

```bash
cd server
npm start
```

The server then runs on http://localhost:8080

## GDPR / Privacy Policy

The application only stores the data needed for authentication and user features..

- Email
- Username
- Hashed Password
- Reset password token and expiry date
- Admin status
- Account creation data
- Favorite champions

Users are also able to delete their own account from the profile page.
When an account is deleted, ALL of their data is removed. The user's account is completely removed which includes their favorite_champions.

Passwords are hashed with bcrypt before they are stored.

This web application uses Resend as a mail provider, as it sends welcome emails and password reset emails.
