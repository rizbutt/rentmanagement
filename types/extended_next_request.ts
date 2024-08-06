import { NextRequest } from 'next/server';

export interface ExtendedNextRequest extends NextRequest {
  user?: {
    _id: string;
    email: string;
    [key: string]: any;
  };
}
