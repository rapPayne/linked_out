import fs from 'fs';

const databaseFile = './people.json';
let thePeople = JSON.parse(fs.readFileSync(databaseFile));

function getAllPeople() {
  return thePeople;
}

function getPerson(id) {
  return thePeople.find(p => p.id === +id)
}

function deletePerson(id) {
  thePeople = thePeople.filter(p => p.id !== +id);
  fs.writeFileSync(databaseFile, JSON.stringify(thePeople));
}

export default peopleRepository = { getAllPeople, getPerson, deletePerson }
