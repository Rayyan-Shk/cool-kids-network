import request from 'supertest';
import express from 'express';
import axios from 'axios';
import authRoutes from '../routes/authRoutes';
import prisma from '../prisma';

// Mock Prisma and axios
jest.mock('../prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn()
  }
}));
jest.mock('axios');

describe('Authentication Routes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api', authRoutes);

    // Mock axios response for randomuser.me
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        results: [{
          name: { first: 'John', last: 'Doe' },
          location: { country: 'Test Country' }
        }]
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/register', () => {
    it('should register a new user successfully', async () => {
      // Mock Prisma and axios behaviors
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue({
        id: 'test-user-id',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        country: 'Test Country',
        role: 'Cool Kid'
      });

      const response = await request(app)
        .post('/api/register')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.email).toBe('test@example.com');
    });

    it('should return 400 if user already exists', async () => {
      // Mock existing user
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'existing-user-id',
        email: 'test@example.com'
      });

      const response = await request(app)
        .post('/api/register')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User already exists');
    });
  });

  describe('POST /api/login', () => {
    it('should login an existing user successfully', async () => {
      const mockUser = {
        id: 'test-user-id',
        email: 'test@example.com',
        role: 'Cool Kid',
        firstName: 'John',
        lastName: 'Doe',
        country: 'Test Country'
      };

      // Mock user find
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          country: 'Test Country'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.email).toBe('test@example.com');
    });

    it('should return 404 if user not found', async () => {
      // Mock no user found
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post('/api/login')
        .send({ email: 'nonexistent@example.com' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });
  });
});