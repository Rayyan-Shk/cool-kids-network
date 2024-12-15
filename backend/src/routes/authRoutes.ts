import { Router } from 'express';
import axios from 'axios';;
import { generateToken } from '../config/jwtUtils';
import prisma from '../prisma';

const router = Router();

// User Registration
router.post('/register', async (req, res: any) => {
  try {
    const { email } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const randomUserResponse = await axios.get('https://randomuser.me/api/');
    const randomUser = randomUserResponse.data.results[0];

    const newUser = await prisma.user.create({
      data: {
        email,
        firstName: randomUser.name.first,
        lastName: randomUser.name.last,
        country: randomUser.location.country,
        role: 'Cool Kid',
      },
    });

    const token = generateToken(newUser.id);
    res.status(201).json({ ...newUser, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// User Login
router.post('/login', async (req, res: any) => {
    try {
      const { email, firstName, lastName, country } = req.body;
  
      const user = await prisma.user.findUnique({
        where: { email },
        select: { 
          id: true, 
          email: true, 
          role: true,
          firstName: true,
          lastName: true,
          country: true
        },
      });
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const token = generateToken(user.id);
      res.status(200).json({ ...user, token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  });
  

export default router;
