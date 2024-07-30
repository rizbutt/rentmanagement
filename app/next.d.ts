import { NextApiRequest } from 'next';
import { JwtPayload } from 'jsonwebtoken';

declare module 'next' {
  interface NextApiRequest {
    user?: string | JwtPayload;
  }
}
