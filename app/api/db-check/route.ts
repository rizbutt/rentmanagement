import { NextResponse } from 'next/server';
import dbConnect from '../../utils/dbConnect';

export async function GET() {
  console.log('GET /api/db-check called'); // Log when the API route is hit
  try {
    await dbConnect();
    return NextResponse.json({ status: 'success', message: 'Database connected successfully' });
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { status: 'error', message: 'Failed to connect to the database', error: errorMessage },
      { status: 500 }
    );
  }
}
