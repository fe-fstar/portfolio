# Database Setup with Drizzle ORM

## Installation

The required packages are already installed:
- `drizzle-orm` - ORM for database operations
- `drizzle-kit` - CLI tool for migrations
- `@neondatabase/serverless` - Neon serverless driver

## Setup Steps

### 1. Push Schema to Database

The easiest way to set up your database is to push the schema directly:

```bash
npm run db:push
```

This will create the `users` table in your PostgreSQL database.

### 2. Seed Initial Data (Optional)

To populate the database with some initial users:

```bash
npm run db:seed
```

This creates 3 users with ranks 1, 3, and 5 for testing.

## Available Scripts

- `npm run db:generate` - Generate migration files from schema
- `npm run db:push` - Push schema changes directly to database (recommended for development)
- `npm run db:migrate` - Run pending migrations
- `npm run db:studio` - Open Drizzle Studio (database GUI at https://local.drizzle.studio)
- `npm run db:seed` - Seed database with initial data

## Schema

The `users` table has the following structure:

- `id` - Auto-incrementing primary key
- `name` - User's full name (required, max 255 chars)
- `email` - User's email (required, unique, max 255 chars)
- `email_verified_at` - Timestamp when email was verified
- `rank` - User's rank (1-10, lower number = higher rank)
- `image` - URL to user's profile image (max 500 chars)
- `created_at` - Timestamp when user was created (auto-generated)
- `updated_at` - Timestamp when user was last updated (auto-generated)

## API Changes

The `/api/people` endpoint now uses PostgreSQL instead of R2:

### GET /api/people
Returns all users from the database.

### POST /api/people
Creates a new user with validation:
- Requires `x-user-id` header for authentication
- Validates name, email format, and rank (1-10)
- Checks email uniqueness
- Verifies authenticated user's rank is sufficient
- Returns created user with auto-generated ID

## Quick Start

1. Make sure your `.env` file has `DATABASE_URL` set
2. Run `npm run db:push` to create the table
3. Run `npm run db:seed` to add test users (optional)
4. Start your Next.js app with `npm run dev`

## Testing the API

Use user ID `1` (Admin) from the seed data to test creating new users:

```bash
curl -X POST http://localhost:3000/api/people \
  -H "Content-Type: application/json" \
  -H "x-user-id: 1" \
  -d '{"name":"John Doe","email":"john@example.com","rank":5}'
```
