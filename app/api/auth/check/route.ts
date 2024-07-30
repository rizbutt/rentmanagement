// app/api/auth/check/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '../../../middleware/authMiddleware';

export async function GET(req: NextRequest) {
  const result = await authMiddleware(req);

  if (result instanceof Response) {
    return result; // Return the Response object if middleware returned it (error case)
  }

  // If middleware passed, it will return the decoded token
  return new NextResponse(JSON.stringify({ message: 'Authenticated' }), { status: 200 });
}
