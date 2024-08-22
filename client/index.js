let people = [];
const peopleSection = document.querySelector('#peopleSection')

async function fetchPeople(numberOfPeople = 25) {
  counter = 1;

  const newPeople = await fetch(`http://127.0.0.1:3001/api/people`)
    .then(res => res.json())
    .then(ppl => ppl.map(p => ({ ...p, id: counter++ })))
  console.log(newPeople);

  people = newPeople;
  drawPeople();
}

function drawPeople() {
  console.log('Drawing', people);
  const makePersonString = person => `
  <section class="card">
  <h2 class="name">${person.name?.first} ${person.name?.last}</h2>
  <img src="${person.picture?.large}" alt="${person.name?.first}" />
  <p><span>✉️</span>${person.email}</p>
  <p><span>📞</span>${person.cell}</p>
  <button>Connect</button>
  </section>
  `;

  // for (let i = 0; i < people.length; i++) {
  //   drawPerson(people[i])
  // }
  //people.forEach(person => drawPerson(person))
  // for (let person of people) {
  //   drawPerson(person)
  // }
  // Convert the array of people to an array of HTML strings and then join them into one string.
  peopleSection.innerHTML = people.map(person => makePersonString(person)).join("");
}



// Not used. Just saving for an example.
// function drawPerson(person) {
//   let html = `<section class="card">`;
//   <h2>${person.name.first} ${person.name.last}</h2>`
//   <img src="${person.picture.large}" alt="${person.name.first}" />`
//   </section>`;
//   peopleSection.innerHTML += html;
// }

