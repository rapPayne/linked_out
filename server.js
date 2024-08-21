import express from 'express';
import cors from 'cors';
import repo from './peopleMongoRepository.js';

const { getAllPeople, getPerson, deletePerson } = repo;

process.loadEnvFile();
const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.static("client"));

//GET /api/people
app.get('/api/people', (req, res) => {
  res.send(getAllPeople());
});

app.get('/api/people/:id', (req, res) => {
  const { id } = req.params;
  const person = getPerson(id);
  console.log("thePerson: ", person)
  if (person !== undefined)
    res.send(person);
  else
    res.sendStatus(404);
});

//TODO: move try/catch to the repository
app.delete('/api/people/:id/', (req, res) => {
  const { id } = req.params;
  try {
    let thePerson = getPerson(+id);
    if (!thePerson) {
      res.status(404).send(`The user with id ${id} isn't available`);
    } else {
      deletePerson(id);
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

