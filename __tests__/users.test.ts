import mongoose from 'mongoose';
import request from 'supertest';
import server from '../src/server';
import * as AuthController from '../src/controller/authController';
import { registerUser } from '../src/controller/authController';
import { MongoMemoryServer } from 'mongodb-memory-server';

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: '624f6493554faf532d72433c',
  email: 'oyeyipeo45@gmail.com',
  password: '12345dfdfdfd',
};

const userCreationResponse = {
  data: {
    email: 'oyeyipeo45@gmail.com',
    __v: 0,
    _id: expect.any(String),
    createdAt: expect.any(String),
    id: expect.any(String),
    password: expect.any(String),
  },
  message: 'user created successfully',
};



const userInput = {
  email: 'test@example.com',
  name: 'Jane Doe',
  password: 'Password123',
  passwordConfirmation: 'Password123',
};


describe('GET Home', () => {
  it('should get a Home page showing server is active', async () => {
    const res = await request(server).get('/');
    expect(res.status).toEqual(200);
    await server.close();
  });
});

describe('user', () => {
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
     it('should return empty users array', async () => {
       const { statusCode, body } = await request(server).get('/auth/users');
      console.log(body, "body 111")
       expect(statusCode).toBe(200);
       expect(body.data).toEqual([]);
     });
   });

    describe('Register user', () => {
      it('Given the username and password are valid users should be regiatered successfully', async () => {
        const { statusCode, body } = await request(server).post('/auth/register').send(userPayload);
        expect(statusCode).toBe(200);
        expect(body).toEqual(userCreationResponse);
      });
    });
  
    describe('Get all users', () => {
      it('should return the users array as payload', async () => {
        const { statusCode, body } = await request(server).get('/auth/users');
        console.log(body, 'body 2222');
        expect(statusCode).toBe(200);
        expect(body.data.length).toBeGreaterThan(0);
      });
    });

   
});
