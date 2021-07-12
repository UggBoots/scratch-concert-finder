const supertest = require('supertest');
const request = supertest('http://localhost:3000');



describe('Sign in tests', () => {

  describe('/api/signin', () => {

    describe('POST', () => {
      it('If user does not exist respond with 400 status and user does not exist', async () => {
        const res = await request.post('/api/signin')
        .send({params:{email:'eric@gmail.com', password: '123123'}});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('User does not exist');
        return;
      });
    
    });
  });
});