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

        it('If username field is blank respond with 400 status and user does not exist', async () => {
          const res = await request.post('/api/signin')
          .send({params:{password: '123123'}});
          expect(res.status).toBe(400);
          expect(res.body.message).toBe('User does not exist');
          return;
        });

          it('If password field is blank respond with 500 status and unknown error', async () => {
            const res = await request.post('/api/signin')
            .send({params:{email:'cameron@gmail.com'}});
            console.log(res.body.message)
            expect(res.status).toBe(500);
            expect(res.body.message).toBe('unknown error');
            return;
          });  
    });
  });
})
