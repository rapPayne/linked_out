import { useState } from 'react';
import { Person } from './Person';

export function People() {
  const [people, setPeople] = useState([]);

  return (
    <>
      <h1>All the cool peoples</h1>
      <button onClick={() => fetchPeople()}>Get people</button>
      <section id="peopleSection">
        {people.map(p => <Person person={p} key={p.id} />)}
      </section>
    </>
  )

  async function fetchPeople() {
    let counter = 1;
    const newPeople = await fetch(`http://127.0.0.1:3001/api/people`)
      .then(res => res.json())
      .then(ppl => ppl.map(p => ({ ...p, id: counter++ })))
    console.log(newPeople);
    setPeople(newPeople);
  }
}