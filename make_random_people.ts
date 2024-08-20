#!/usr/bin/env node
import fs from 'fs';

const numberOfPeople: number = 100;
const url: string = `https://randomuser.me/api?results=${numberOfPeople}&inc=name,location,email,cell,picture,dob`;

const allThePeople: [] = await fetch(url)
  .then(res => res.json())
  .then(res => res.results)
  .then(people => people.map((p, index) => ({ ...p, id: index + 10 })))
  .catch(err => console.error("Error fetching people", err));

const dbFileName: string = "./people.json";

// If the file exists already, delete it.
if (fs.existsSync(dbFileName)) {
  fs.unlinkSync(dbFileName)
}

// Write this new data in JSON format to the file.
fs.writeFileSync(dbFileName, JSON.stringify(allThePeople, null, 2))

console.log(`database file (${dbFileName}) was created and seeded.`)