let people = [];
let counter = 1;
const peopleSection = document.querySelector('#peopleSection')

async function fetchPeople(numberOfPeople = 25) {

  const newPeople = await fetch(`https://randomuser.me/api/?results=${numberOfPeople}`)
    .then(res => res.json())
    .then(res => res.results)
    .then(ppl => ppl.map(p => ({ ...p, id: counter++ })))
  console.log(newPeople);
  const nP = newPeople.map(person => {
    newPerson = JSON.parse(JSON.stringify(person));
    newPerson.name = `${person.name.first} ${person.name.last}`;
    newPerson.age = person.dob.age;
    newPerson.location = `${person.location.city}, ${person.location.state}, ${person.location.country}`;
    return newPerson;
  });
  people = [...people, ...nP];
  drawNewPeople(nP);
}

function drawNewPeople(newPeople) {
  const makePersonString = person => `
  <section class="card" onclick="changePane(${person.id})">
  <h2 class="name">${person.name}</h2>
  <img src="${person.picture.large}" alt="${person.name.first}" />
  <p><span>✉️</span>${person.email}</p>
  <p><span>📞</span>${person.phone}</p>
  <button >Connect</button>
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
  peopleSection.innerHTML += newPeople.map(person => makePersonString(person)).join("");
}

function changePane(id) {
  const person = people.find(person => person.id === id);
  if (person === null) {
    return;
  }
  const pane = document.getElementById("pane");
  const data = pane.getElementsByTagName("p");
  for (element of data) {
      element.innerText = person[element.id];
  }
  const picture = pane.getElementsByTagName("img")[0];
  picture.setAttribute("src", person.picture.large);
  picture.setAttribute("alt", `Picture of ${person.name}`);
}


// Not used. Just saving for an example.
// function drawPerson(person) {
//   let html = `<section class="card">`;
//   <h2>${person.name.first} ${person.name.last}</h2>`
//   <img src="${person.picture.large}" alt="${person.name.first}" />`
//   </section>`;
//   peopleSection.innerHTML += html;
// }

