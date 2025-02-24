/**
 * ************************************
 * @file  verifyUser.test.js
 * @description Express Route testing and Login Authentication testing
 * ************************************
 */

const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Sign in tests', () => {

  describe('/api/signin', () => {

    describe('POST', () => {

      it('If username and password are correct responds with a 200 status and you successfully logged in', async () => {
        const res = await request.post('/api/signin')
        .send({email:'apple1@gmail.com', password: 'apple'});
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('You succesfully logged in!');
        return;
      });

      it('If username and password are incorrect respond with 400 status and Incorrect email/password combination', async () => {
        const res = await request.post('/api/signin')
        .send({email:'eric@gmail.com', password: '123123'});
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User does not exist');
        return;
      });

      it('If user does not exist respond with 400 status and user does not exist', async () => {
        const res = await request.post('/api/signin')
        .send({email:'apples@gmail.com', password: '123123'});
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User does not exist');
        return;
      });

        it('If username field is blank respond with 400 status and user does not exist', async () => {
          const res = await request.post('/api/signin')
          .send({password: '123123'});
          expect(res.status).toBe(200);
          expect(res.body.message).toBe('User does not exist');
          return;
        });

          it('If password field is blank respond with 500 status and unknown error', async () => {
            const res = await request.post('/api/signin')
            .send({email:'cameron@gmail.com'});
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('User does not exist');
            return;
          });  
    });
  });
})
