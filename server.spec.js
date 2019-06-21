const request = require('supertest'); // calling it "request" is a common practice

const server = require('./server'); // this is our first red, file doesn't exist yet
//added this line so i coudl push to the branch
describe('server.js', () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe('index route', () => {

    it('testing get functionalty', async () => {
        let response = await request(server).get('/games');
        expect(response.status).toEqual(200);
        
        expect(response.body.data.length).toBeDefined(); //check we get good data
        response = await request(server).delete('/games') //delete everything

        response = await request(server).get('/games');
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body.data)).toBe(true);//make sure we get an array back
      });

//post
    it('testing post funcitonality', async () => {
        // do a get request to our api (server.js) and inspect the response
        let d = {
          title: 'Pacman', // required
          genre: 'Arcade', // required
          releaseYear: 1980 // not required
        }
        let response = await request(server).post('/games').send(d); //test correct
        expect(response.status).toEqual(201);
        expect(response.body.data).toBeDefined();

        d.releaseYear = undefined;
        d.title = 'Pacman 2'
        response = await request(server).post('/games').send(d); //test no release year
        expect(response.status).toEqual(201);
        expect(response.body.data).toBeDefined();


        response = await request(server).post('/games').send(d); //test unique
        expect(response.status).toEqual(405);

        response = await request(server).post('/games'); //test no body
        expect(response.status).toEqual(422);

      });

      //delete
      it('testing delete functionality', async () => {
        // do a get request to our api (server.js) and inspect the response
        let response = await request(server).delete('/games')
        expect(response.status).toEqual(202);
      });
  });
});