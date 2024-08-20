import express from 'express';
import fs from 'fs';
import cors from 'cors';

process.loadEnvFile();
const port = process.env.PORT || 3001;

const thePeople = JSON.parse(fs.readFileSync('./people.json'));

const app = express();
app.use(cors());
app.use(express.static("client"));

//GET /api/people
app.get('/api/people', (req, res) => {
  res.send(thePeople);
});

app.get('/api/people/:id', (req, res) => {
  const person = thePeople.find(p => p.id === +req.params.id);
  console.log("thePerson: ", person)
  if (person !== undefined)
    res.send(person);
  else
    res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
})

