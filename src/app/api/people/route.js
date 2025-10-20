export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

let users = [
  {"id":1,"name":"Mrs. Oleta Koelpin DVM","email":"marie.oreilly@example.net","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":3,"image":"https://picsum.photos/id/1/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":2,"name":"Prof. Susanna Zieme","email":"ybergnaum@example.net","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":7,"image":"https://picsum.photos/id/2/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":3,"name":"Ms. Janelle Lockman II","email":"aufderhar.greyson@example.com","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":8,"image":"https://picsum.photos/id/3/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":4,"name":"Mervin Ferry","email":"max52@example.com","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":1,"image":"https://picsum.photos/id/4/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":5,"name":"Jessica Lind","email":"sincere.heaney@example.org","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":2,"image":"https://picsum.photos/id/5/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":6,"name":"Shyanne Schaefer","email":"dena.ebert@example.org","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":3,"image":"https://picsum.photos/id/6/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":7,"name":"Zack Reynolds","email":"amely.kiehn@example.net","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":5,"image":"https://picsum.photos/id/7/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":8,"name":"America Windler","email":"borer.casimir@example.org","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":3,"image":"https://picsum.photos/id/8/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":9,"name":"Cade Stracke Sr.","email":"quitzon.henderson@example.com","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":9,"image":"https://picsum.photos/id/9/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":10,"name":"Miss Fiona Mertz Sr.","email":"roscoe.purdy@example.com","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":2,"image":"https://picsum.photos/id/10/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":11,"name":"Mrs. Laila Crona MD","email":"hmarvin@example.org","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":7,"image":"https://picsum.photos/id/11/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":12,"name":"Jazmin DuBuque MD","email":"melody.nader@example.org","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":2,"image":"https://picsum.photos/id/12/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":13,"name":"Santos Spencer","email":"jayne46@example.com","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":4,"image":"https://picsum.photos/id/13/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":14,"name":"Luis Padberg","email":"brandyn.rohan@example.com","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":4,"image":"https://picsum.photos/id/14/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":15,"name":"Dr. Karl Rodriguez I","email":"bryce64@example.net","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":2,"image":"https://picsum.photos/id/15/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":16,"name":"Marcellus Bernhard","email":"wisoky.chauncey@example.org","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":1,"image":"https://picsum.photos/id/16/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":17,"name":"Dr. Clementina Leannon IV","email":"dschiller@example.org","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":4,"image":"https://picsum.photos/id/17/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":18,"name":"Dayna O'Hara","email":"elta.turner@example.net","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":6,"image":"https://picsum.photos/id/18/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":19,"name":"Leonora Roob","email":"mcclure.lisandro@example.com","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":7,"image":"https://picsum.photos/id/19/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":20,"name":"Oliver Barton","email":"ari.oconner@example.org","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":8,"image":"https://picsum.photos/id/20/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":21,"name":"Rocky Mertz","email":"kaylin96@example.com","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":5,"image":"https://picsum.photos/id/21/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":22,"name":"Dr. Baron Runolfsson III","email":"ida36@example.net","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":5,"image":"https://picsum.photos/id/22/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":23,"name":"Prof. Lorenzo Zulauf","email":"jakubowski.naomi@example.com","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":8,"image":"https://picsum.photos/id/23/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":24,"name":"Darren Gottlieb I","email":"runte.reagan@example.net","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":4,"image":"https://picsum.photos/id/24/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":25,"name":"Adeline Denesik","email":"uromaguera@example.org","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":10,"image":"https://picsum.photos/id/25/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":26,"name":"Reed Johns II","email":"kendrick63@example.com","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":2,"image":"https://picsum.photos/id/26/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":27,"name":"Prof. Anya Volkman","email":"kwillms@example.org","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":3,"image":"https://picsum.photos/id/27/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":28,"name":"Prof. Theron Gusikowski","email":"kuhlman.bonita@example.com","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":4,"image":"https://picsum.photos/id/28/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":29,"name":"Cleo Block","email":"blick.taylor@example.org","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":3,"image":"https://picsum.photos/id/29/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
  {"id":30,"name":"Aditya Schmeler MD","email":"rutherford.heather@example.com","email_verified_at":"2025-10-20T06:39:22.000000Z","rank":9,"image":"https://picsum.photos/id/30/600/400","created_at":"2025-10-20T06:39:22.000000Z","updated_at":"2025-10-20T06:39:22.000000Z"},
];

// --- Helper: email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// --- GET: return all users
export async function GET() {
  return NextResponse.json(users);
}

// --- POST: create new user
export async function POST(request) {
  try {
    const authenticatedUserId = request.headers.get('x-user-id');

    if (!authenticatedUserId) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const { name, email, rank } = await request.json();

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { message: 'Name cannot be empty' },
        { status: 400 }
      );
    }

    if (!email || email.trim() === '') {
      return NextResponse.json(
        { message: 'Email cannot be empty' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!rank || rank < 1 || rank > 10) {
      return NextResponse.json(
        { message: 'Rank must be between 1-10' },
        { status: 400 }
      );
    }

    const authenticatedUser = users.find(
      (user) => user.id === Number(authenticatedUserId)
    );

    if (!authenticatedUser) {
      return NextResponse.json(
        { message: 'Authenticated user not found' },
        { status: 403 }
      );
    }

    // Permission rule: can only create users with lower rank
    if (authenticatedUser.rank > rank) {
      return NextResponse.json(
        {
          message:
            'Insufficient permissions: Your rank is not high enough to create a user with this rank (lower number = higher rank)',
        },
        { status: 403 }
      );
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

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
