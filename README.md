# Ruinstars Companion App

**Ruinstars** is a sci-fi skirmish wargame and this is its official open-source companion app.  
Built with Next.js, TailwindCSS, and Prisma, it provides digital tools for managing squads, tracking games, and referencing rules.  
It is installable from your web browser as a [PWA - Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app)

## Features

- Squad and unit builder
- Gear and special rules logic
- Interactive rulebook
- Local and server game tracking
- Developer-friendly data seeding
- PWA install

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- TailwindCSS
- Prisma + MySQL
- NextAuth
- PWA + Service Worker

## Contributing

Contributions are welcome — especially bug fixes, UI suggestions, and typo corrections.  
All contributions become the property of the project owner and may be modified or incorporated at their discretion.

To contribute:

1. Fork this repo
2. Open a pull request
3. Describe your change clearly

## Getting Started

To run the Ruinstars Companion App locally, you'll need:

- Node.js 18+
- MySQL database (local or remote)
- A `.env` file with your database credentials
- Seeded core game data (squadTypes, gear, unit types, etc.)

---

### 1. Clone the Repository

```bash
git clone https://github.com/vjosset/ruinstars.git
cd ruinstars
```

---

### 2. Set Up Your Environment

Create a `.env` file in the project root. You can start by copying the template:

```bash
cp .env.example .env
```

Edit the `.env` file to match your MySQL connection:

```env
# Database connection string (adjust username, password, host, db name)
DATABASE_URL="mysql://user:pass@host:3306/ruinstars"

# Used by NextAuth.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:5000"
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Set Up the Database

Generate the Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Then seed the database with core game data:

```bash
npm run seed
```

---

### 5. Start the App

```bash
npm run dev
```

This will start the app on `http://localhost:5000`.

---

## App Overview

- Built with [Next.js 14 App Router](https://nextjs.org/)
- Uses [Prisma](https://www.prisma.io/) with a MySQL backend
- Auth powered by [NextAuth](https://next-auth.js.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Designed as a PWA with service worker support
- Tracks in-game state, rules, squads, units, and equipment

---

## Optional Development Scripts

| Script | Description |
|--------|-------------|
| `npm run seed` | Seeds core game content (Factions, SquadTypes, Gear, etc.) |
| `npm run build` | Builds production app |
| `npm run start` | Starts app on port `4000` by default |

## Production Deployment

Sample `deploy.sh`:

```bash
#!/bin/bash
# Make sure to make this script executable
# chmod +x deploy.sh
# Make sure you have pm2 installed globally

set -e  # Exit on first error

echo "Pulling latest code..."
git pull origin main

echo "Installing dependencies..."
npm ci --yes

echo "Generating Prisma client..."
npx prisma generate

echo "Building app..."
npm run build

echo "Starting app..."
pm2 restart ruinstars-app || pm2 start npm --name ruinstars-app -- run start

echo "Saving PM2 process list..."
pm2 save
```
