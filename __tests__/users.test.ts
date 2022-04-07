import request from 'supertest';
import server from '../src/server'


describe('GET Home', () => {
  it('should get a Login page', async () => {
    const res = await request(server).get('/'); 
      expect(res.status).toEqual(200);
    //   expect(res.message).toEqual('Dalt pay home');
    await server.close();
  });
});