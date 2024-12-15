// @ts-nocheck
import express from 'express';
import request from 'supertest';
import userRoutes from '../routes/userRoutes';
import authenticateUser from '../middlewares/authMiddleware';

// Mock Prisma to avoid actual DB interaction
jest.mock('../prisma', () => ({
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
}));

// Mock authenticateUser middleware
jest.mock('../middlewares/authMiddleware', () => ({
  __esModule: true, // Support ES6-style imports
  default: jest.fn((req, res, next) => {
    req.user = { id: 'test-id', role: 'Coolest Kid' }; // Mock user
    next();
  }),
}));

const prisma = require('../prisma'); // Import mocked Prisma

describe('User Routes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api', userRoutes);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe('GET /api/users', () => {
    it('should return users for Coolest Kid role', async () => {
      const mockUsers = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Coolest Kid' },
      ];

      prisma.user.findMany.mockResolvedValue(mockUsers); // Mock DB call

      const res = await request(app).get('/api/users').set('Authorization', 'Bearer valid-token');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        select: { firstName: true, lastName: true, country: true, email: true, role: true },
      });
    });

    it('should return 403 for Cool Kid role', async () => {
      (authenticateUser as jest.Mock).mockImplementationOnce((req, res, next) => {
        req.user = { id: 'test-id', role: 'Cool Kid' }; // Mock "Cool Kid" user
        next();
      });

      const res = await request(app).get('/api/users').set('Authorization', 'Bearer valid-token');
      expect(res.status).toBe(403);
      expect(res.body).toEqual({ message: 'Insufficient permissions' });
    });
  });

  describe('PATCH /api/users/role', () => {
    it('should update user role successfully', async () => {
      const mockUser = { id: 1, email: 'test@example.com', role: 'Cool Kid' };
      const updatedUser = { ...mockUser, role: 'Coolest Kid' };

      prisma.user.findUnique.mockResolvedValue(mockUser); // Mock user retrieval
      prisma.user.update.mockResolvedValue(updatedUser); // Mock user update

      const res = await request(app)
        .patch('/api/users/role')
        .send({ email: 'test@example.com', newRole: 'Coolest Kid' })
        .set('Authorization', 'Bearer valid-token');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        message: 'Role updated successfully',
        user: { email: 'test@example.com', role: 'Coolest Kid' },
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { role: 'Coolest Kid' },
      });
    });

    it('should return 400 for invalid role', async () => {
      const res = await request(app)
        .patch('/api/users/role')
        .send({ email: 'test@example.com', newRole: 'Invalid Role' })
        .set('Authorization', 'Bearer valid-token');

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ message: 'Invalid role' });
    });
  });
});
