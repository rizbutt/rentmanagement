import { NextRequest, NextResponse } from 'next/server';
import AuthService from '../../../services/AuthService';
import dbConnect from '../../../utils/dbConnect';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const authService = new AuthService();
    const { email, password } = await req.json();
    const user = await authService.register({ email, password });
    return NextResponse.json(user);
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
