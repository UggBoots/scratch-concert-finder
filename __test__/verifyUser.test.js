const request = require('supertest');
const server = 'http://localhost:3000';

describe('Sign in tests', () => {

  describe('/api/signin', () => {

    describe('POST', () => {
      it('correct username and password responds with you have successfully logged in!', () => 
      request(server)
        .post('/api/signin')
        .send({email: 'Dan@codesmith.com', password: '123123'})
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then(response => {
          console.log(response.message)
          expect(response).toEqual('You succesfully logged in!');
        })
        .catch(err => err));

        it('if email is not in the database then responds with User does not exist', () => 
      request(server)
        .post('/api/signin')
        .send({email: 'eric@gmail.com', password: '123123'})
        .expect('Content-Type', /application\/json/)
        .expect(400)
        .then(response => {
          console.log(response.message)
          expect(response).toEqual('User does not exist');
        })
        .catch(err => err));

        it('if email or password is incorrect then responds with Incorrect email/password combination', () => 
        request(server)
          .post('/api/signin')
          .send({email: 'Dan@codesmith.com', password: 'apples'})
          .expect('Content-Type', /application\/json/)
          .expect(400)
          .then(response => {
            console.log(response.message)
            expect(response).toEqual('Incorrect email/password combination');
          })
          .catch(err => err));

          it('if any other error or fields are blank will respond with unknown error', () => 
        request(server)
          .post('/api/signin')
          .send({})
          .expect('Content-Type', /application\/json/)
          .expect(400)
          .then(response => {
            console.log(response.message)
            expect(response).toEqual('unknown error');
          })
          .catch(err => err));
        
    });
  });
});