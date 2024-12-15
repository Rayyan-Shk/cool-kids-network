import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'Rank-Math';

// Generate JWT Token
export function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

// Verify JWT Token
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
