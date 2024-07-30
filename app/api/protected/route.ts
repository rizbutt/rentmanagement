// app/api/protected.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import authMiddleware from '../../middleware/authMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise((resolve, reject) => {
    authMiddleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });

  // Your protected API logic here
  res.status(200).json({ message: 'This is a protected route', user: (req as any).user });
};

export default handler;
