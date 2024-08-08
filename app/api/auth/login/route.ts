import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import AuthService from '../../../../services/auth_service';
import dbConnect from '../../../../utils/db_connect_util';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const authService = new AuthService();
    const { email, password } = await req.json();
    const user = await authService.login({ email, password });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });

    return NextResponse.json({ token });
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
