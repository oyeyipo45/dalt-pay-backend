import mongoose from 'mongoose';
import request from 'supertest';
import server from '../src/server';
import { MongoMemoryServer } from 'mongodb-memory-server';

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  firstName: 'damilola',
  lastName: 'oyeyipo',
  email: 'oyeyipeo45@gmail.com',
  password: '12345dfdfdfd',
};

const userCreationResponse = {
  data: {
    email: 'oyeyipeo45@gmail.com',
    firstName: 'damilola',
    lastName: 'oyeyipo',
    __v: 0,
    _id: expect.any(String),
    createdAt: expect.any(String),
    id: expect.any(String),
    password: expect.any(String),
  },
  message: 'user created successfully',
};

describe('USER', () => {
  // user registration

  // Connect to database before any test
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  // Disconnect from database after all test have been ran
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('Get all users', () => {
    it('Given the registration data are present and valid, users should be registered successfully', async () => {
      const { statusCode, body } = await request(server).post('/auth/register').send(userPayload);
      expect(statusCode).toBe(200);
      expect(body).toEqual(userCreationResponse);
    });

    it('should return the users array as payload', async () => {
      const { statusCode, body } = await request(server).get('/user/all');
      expect(statusCode).toBe(200);
      expect(body.data.length).toBeGreaterThan(0);
    });
  });
});
