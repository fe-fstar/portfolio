import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

config({ path: ".env" });

// Define schema inline
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerifiedAt: timestamp('email_verified_at'),
  rank: integer('rank').notNull().default(10),
  image: varchar('image', { length: 500 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Create db connection
const db = drizzle(process.env.DATABASE_URL);

// Random name generator
const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Barbara', 'David', 'Elizabeth', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young'
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomName() {
  return `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
}

function generateRandomEmail(name) {
  const username = name.toLowerCase().replace(/\s+/g, '.');
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com', 'test.com'];
  return `${username}@${getRandomElement(domains)}`;
}

function getRandomRank() {
  // More realistic distribution: fewer high ranks, more low ranks
  const rand = Math.random();
  if (rand < 0.1) return Math.floor(Math.random() * 3) + 1; // 10% chance: ranks 1-3
  if (rand < 0.3) return Math.floor(Math.random() * 3) + 4; // 20% chance: ranks 4-6
  return Math.floor(Math.random() * 4) + 7; // 70% chance: ranks 7-10
}

async function seed() {
  console.log('🌱 Seeding database with 30 users...');

  try {
    const seedUsers = [];

    for (let i = 1; i <= 30; i++) {
      const name = generateRandomName();
      const email = generateRandomEmail(name);
      const rank = getRandomRank();

      seedUsers.push({
        name,
        email,
        emailVerifiedAt: new Date(),
        rank,
        image: `https://picsum.photos/id/${i}/600/400`,
      });
    }

    await db.insert(users).values(seedUsers);

    console.log(`✅ Successfully seeded ${seedUsers.length} users!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
