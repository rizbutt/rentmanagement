// middleware/authMiddleware.ts
import jwt from 'jsonwebtoken';

export async function authMiddleware(req: Request) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded; // Returning the decoded token instead of using `next` callback
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
}
