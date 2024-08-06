import { NextRequest, NextResponse } from 'next/server';
import AuthService from '../../../../services/auth_service';
import dbConnect from '../../../../utils/db_connect_util';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const authService = new AuthService();
    const registerData = await req.json();
    const user = await authService.register(registerData);
    return NextResponse.json(user);
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
