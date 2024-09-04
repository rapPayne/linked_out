import express from 'express';
import cors from 'cors';
import repo from './peopleMongoRepository.js';
import jwt from 'jsonwebtoken';


const { getAllPeople, getPerson, deletePerson } = repo;

process.loadEnvFile();
const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("client"));
const jwtSecret = "This is the jwt-secret-key! Oooooooh!"

//Middleware to process authentication via a JWT token
app.use((req, res, next) => {
  // check if client sent our JWT token in the 'authorization' header.
  const authHeader = req.headers['authorization'];
  const jwtToken = authHeader && authHeader.split(' ')[1];
  // Get the username/data from the jwtToken and put it in req.user
  jwt.verify(jwtToken, jwtSecret, (err, user) => {
    if (err) {
      console.warn("No user found")
      return; // user isn't validated
    }
    req.user = user; // Now all other endpoints who the user is.
  });
  next();
});

//Endpoint added to demonstrate writing a JWT token.
//POST /api/login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Hardcoding a fake user. In a real scenario, this would be set by authenticating on login POST with a good username/password.
  const user = { username, id: 733, first: "Shivani", last: "Kolanu" };
  if (!user) {
    res.send(401)
  } else {
    const jwtToken = jwt.sign(user, jwtSecret);
    res.header('Authorization', `Bearer ${jwtToken}`);
    res.send({ ...user, password: "***" }); // clobber the password in case it's part of the user record from the DB
  }
});

//GET /api/people
app.get('/api/people', async (req, res) => {
  res.send(await getAllPeople());
});

app.get('/api/people/:id', async (req, res) => {
  const { id } = req.params;
  const person = await getPerson(id);
  console.log("thePerson: ", person)
  res.header('Authorization', `Bearer ${jwtToken}`); // Write JWT token to response
  if (person !== undefined)
    res.send(person);
  else
    res.sendStatus(404);
});

//TODO: move try/catch to the repository
app.delete('/api/people/:id/', async (req, res) => {
  const { id } = req.params;
  res.header('Authorization', `Bearer ${jwtToken}`); // Write JWT token to response
  try {
    let thePerson = await getPerson(+id);
    if (!thePerson) {
      res.status(404).send(`The user with id ${id} isn't available`);
    } else {
      await deletePerson(id);
      res.sendStatus(204);
    }
  }
  catch {
    res.status(500).send(`Unknown error occurred`);
  }
});

app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
})

