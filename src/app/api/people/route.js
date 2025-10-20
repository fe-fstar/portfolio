export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

// --- Helper: email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// --- GET: return all users
export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}

// --- POST: create new user
export async function POST(request) {
  try {
    const authenticatedUserId = request.headers.get('x-user-id');
    if (!authenticatedUserId) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    const { name, email, rank } = await request.json();

    if (!name?.trim()) return NextResponse.json({ message: 'Name cannot be empty' }, { status: 400 });
    if (!email?.trim()) return NextResponse.json({ message: 'Email cannot be empty' }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    if (!rank || rank < 1 || rank > 10) return NextResponse.json({ message: 'Rank must be between 1-10' }, { status: 400 });

    // Get authenticated user from database
    const [authenticatedUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(authenticatedUserId)))
      .limit(1);

    if (!authenticatedUser) {
      return NextResponse.json({ message: 'Authenticated user not found' }, { status: 403 });
    }

    if (authenticatedUser.rank > rank) {
      return NextResponse.json({
        message: 'Insufficient permissions: Your rank is not high enough to create a user with this rank (lower number = higher rank)',
      }, { status: 403 });
    }

    // Check if email already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.trim()))
      .limit(1);

    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // Get total user count for image ID
    const allUsers = await db.select().from(users);
    const imageId = allUsers.length + 1;

    // Insert new user
    const [newUser] = await db
      .insert(users)
      .values({
        name: name.trim(),
        email: email.trim(),
        emailVerifiedAt: new Date(),
        rank: parseInt(rank),
        image: `https://picsum.photos/id/${imageId}/600/400`,
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
