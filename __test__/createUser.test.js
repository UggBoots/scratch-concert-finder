const request = require('supertest');
const server = 'http://localhost:3000';


describe('Route integration', () => {

  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200));
    });
  });

//   describe('/api/getFavorites', () => {
//     describe('GET', () => {
//       it('responds with 200 status and application/json content type', () => request(server)
//         .get('/api/getFavorites')
//         .expect('Content-Type', /application\/json/)
//         .expect(200));

//       it('stores from the db are in the body of the response', () => request(server)
//         .get('/api/getFavorites')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /application\/json/)
//         .expect(200)
//         .then(response => {
//           console.log(response.body)
//           expect(response.body.favorites).toEqual([]);
//         })
//         .catch(err => err));
//     });
//   });

});