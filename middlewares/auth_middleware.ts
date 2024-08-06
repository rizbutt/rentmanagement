import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { ExtendedNextRequest } from '../types/extended_next_request';

export async function authMiddleware(req: ExtendedNextRequest) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as { _id: string; email: string; [key: string]: any };
    return true;
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
}
