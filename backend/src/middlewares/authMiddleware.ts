// @ts-nocheck

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

// Define allowed roles with their permissions
const ROLE_PERMISSIONS = {
  'Cool Kid': ['read:limited'],
  'Cooler Kid': ['read:full', 'update:role']
};

const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        country: true,
        role: true
      }
    });

    if (!user) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    // Add role-based access control
    req.user = user;
    
    // Optional: Add method to check specific permissions
    req.userCan = (permission: string) => {
      const userRole = user.role;
      return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Invalid token' });
    } else {
      console.error('Authentication error:', error);
      res.status(500).json({ message: 'Authentication failed' });
    }
  }
};

export default authenticateUser;

// Utility function for role-based access control
export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: 'Insufficient permissions' });
      return;
    }
    next();
  };
};