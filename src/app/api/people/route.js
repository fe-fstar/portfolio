import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize R2 client
const r2Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to get JSON data from R2
async function getJsonFromR2() {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.R2_BUCKET,
            Key: 'sample.json',
        });
        
        const response = await r2Client.send(command);
        const body = await response.Body.transformToString();
        console.log(body);
        return JSON.parse(body);
    } catch (error) {
        console.error('Error fetching from R2:', error);
        return [];
    }
}

// Helper function to put JSON data to R2
async function putJsonToR2(data) {
    try {
        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET,
            Key: 'sample.json',
            Body: JSON.stringify(data, null, 2),
            ContentType: 'application/json',
        });
        
        await r2Client.send(command);
        return true;
    } catch (error) {
        console.error('Error uploading to R2:', error);
        return false;
    }
}

export async function GET() {
    try {
        const response = await fetch('https://assets.springeu.com/sample.json')
            .then(res => !res.ok ? [] : res.json())
            .catch(err => []);

        return NextResponse.json(response);
    } catch (error) {
        return [];
    }
}

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

        const currentData = await getJsonFromR2();
        console.log("current data:", currentData);
        console.log("user id:", authenticatedUserId);
        
        const authenticatedUser = currentData.find(user => user.id === Number(authenticatedUserId));
        
        if (!authenticatedUser) {
            return NextResponse.json(
                { message: 'Authenticated user not found' },
                { status: 403 }
            );
        }

        if (authenticatedUser.rank > rank) {
            return NextResponse.json(
                { message: 'Insufficient permissions: Your rank is not high enough to create a user with this rank (lower number = higher rank)' },
                { status: 403 }
            );
        }

        const newUser = {
            id: currentData.length,
            name: name.trim(),
            email: email.trim(),
            email_verified_at: new Date().toISOString(),
            rank: parseInt(rank),
            image: `https://picsum.photos/id/${currentData.length}/600/400`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const updatedData = [...currentData, newUser];

        const uploadSuccess = await putJsonToR2(updatedData);
        
        if (!uploadSuccess) {
            return NextResponse.json(
                { message: 'Failed to save data' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { 
                message: 'User created successfully',
                user: newUser
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