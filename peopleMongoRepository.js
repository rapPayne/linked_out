import { MongoClient } from "mongodb";
let client;
let col;
try {
  //Point to the mongodb server
  const url = `mongodb://localhost:27017/peopleRepo`;
  client = await MongoClient.connect(url);
  //Point to the people collection
  col = client.db().collection('people')
}
catch (err) {
  console.error(`Couldn't connect to mongo`, err);
}
//TODO: Don't forget to close the connection!!!!

async function getAllPeople() {
  const people = await col.find().toArray();
  console.log(people)
  return people;
}

async function getPerson(id) {
  const person = await col.findOne({ id: +id });
  return person;
}

async function deletePerson(id) {
  return await col.deleteOne({ id: +id });
}

export default {
  getAllPeople,
  getPerson,
  deletePerson
};