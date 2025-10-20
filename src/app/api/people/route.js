export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
  runtime: 'fetch' // ensures fetch-based streaming, not Node fs
});

const BUCKET = process.env.R2_BUCKET;
const Key = 'sample.json';

// --- Helper: email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// --- Helper: read JSON from R2
async function getUsersFromR2() {
  try {
    const command = new GetObjectCommand({ Bucket: BUCKET, Key });
    const response = await r2Client.send(command);

    const chunks = [];
    for await (const chunk of response.Body) chunks.push(chunk);
    const jsonString = Buffer.concat(chunks).toString('utf-8');
    return JSON.parse(jsonString);
  } catch (err) {
    // If file doesn't exist, return empty array
    console.log(err);

    return [];
  }
}

// --- Helper: write JSON to R2
async function putUsersToR2(users) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key,
    Body: JSON.stringify(users, null, 2),
    ContentType: 'application/json'
  });
  await r2Client.send(command);
}

// --- GET: return all users
export async function GET() {
  const users = await getUsersFromR2();
  return NextResponse.json(users);
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

    const users = await getUsersFromR2();
    const authenticatedUser = users.find(u => u.id === Number(authenticatedUserId));

    if (!authenticatedUser) return NextResponse.json({ message: 'Authenticated user not found' }, { status: 403 });
    if (authenticatedUser.rank > rank) {
      return NextResponse.json({
        message: 'Insufficient permissions: Your rank is not high enough to create a user with this rank (lower number = higher rank)',
      }, { status: 403 });
    }

    const newUser = {
      id: users.length + 1,
      name: name.trim(),
      email: email.trim(),
      email_verified_at: new Date().toISOString(),
      rank: parseInt(rank),
      image: `https://picsum.photos/id/${users.length + 1}/600/400`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    users.push(newUser);
    await putUsersToR2(users);

    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
