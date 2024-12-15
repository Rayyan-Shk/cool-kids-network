// @ts-nocheck

import { Router } from 'express';
import prisma from '../prisma';
import authenticateUser from '../middlewares/authMiddleware';

const router = Router();

// Get Users Based on Role
router.get('/users', authenticateUser, async (req: any, res) => {
    const userRole = req.user.role;
  
    // Explicitly handle role-based access
    const rolePermissions = {
      'Cool Kid': () => res.status(403).json({ message: 'Insufficient permissions' }),
      'Cooler Kid': { select: { firstName: true, lastName: true, country: true } },
      'Coolest Kid': { select: { firstName: true, lastName: true, country: true, email: true, role: true } }
    };
  
    // Check if the role exists in permissions
    const roleQuery = rolePermissions[userRole];
    
    // If no query found or it's a function (403 case), handle accordingly
    if (!roleQuery || typeof roleQuery === 'function') {
      return roleQuery ? roleQuery() : res.status(403).json({ message: 'Unauthorized' });
    }
  
    try {
      const result = await prisma.user.findMany(roleQuery);
      res.json(result);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  });

// Update User Role
router.patch('/users/role', authenticateUser, async (req, res: any) => {
  const { email, firstName, lastName, newRole } = req.body;

  const validRoles = ['Cool Kid', 'Cooler Kid', 'Coolest Kid'];
  if (!validRoles.includes(newRole)) return res.status(400).json({ message: 'Invalid role' });

  let user = email
    ? await prisma.user.findUnique({ where: { email } })
    : await prisma.user.findFirst({ where: { firstName, lastName } });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { role: newRole },
  });

  res.json({ message: 'Role updated successfully', user: { email: updatedUser.email, role: updatedUser.role } });
});

export default router;
