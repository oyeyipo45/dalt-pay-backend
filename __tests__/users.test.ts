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

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  console.log(process.env.NODE_ENV, "process.env.NODE_ENVprocess.env.NODE_ENVvprocess.env.NODE_ENV");

  describe('user registration', () => {
    describe('given the username and password are valid', () => {
       jest.setTimeout(30000);
        
      it('should return the user payload', async () => {

        const { statusCode, body } = await request(server).post('/auth/register').send(userPayload);
        console.log(body, "boddd")

        expect(statusCode).toBe(200);

        expect(body).toEqual(userCreationResponse);

      });
    });
  });
});