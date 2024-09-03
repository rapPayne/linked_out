import { useEffect, useState } from 'react';
import { Person } from './Person';
import { PersonDetails } from './PersonDetails';
import './People.css';

export function People() {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState();

  useEffect(() => {
    fetchPeople()
  }, []);
  return (
    <section className='People'>
      <div>
        <h1>All the cool peoples</h1>
        <section id="peopleSection">
          {people
            .map(p => <Person person={p} key={p.id} selectPerson={setSelectedPerson} />)}
        </section>
      </div>
      {selectedPerson &&
        <section id="personDetails">
          <PersonDetails person={selectedPerson} />
        </section>
      }
    </section>
  )

  async function fetchPeople() {
    let counter = 1;
    const newPeople = await fetch(`http://127.0.0.1:3001/api/people`)
      .then(res => res.json())
      .then(ppl => ppl.map(p => ({ ...p, id: counter++ })))
    console.log(newPeople);
    setPeople(newPeople.toSorted(() => Math.random() > 0.5 ? 1 : -1));
  }
}