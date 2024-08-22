/* eslint-disable react/prop-types */

export const Person = ({ person }) => {
  return (
    <section className="card">
      <h2 className="name">{person.name?.first} {person.name?.last}</h2>
      <img src={person.picture?.large} alt={person.name?.first} />
      <p><span>✉️</span>{person.email}</p>
      <p><span>📞</span>{person.cell}</p>
      <button>Connect</button>
    </section>
  )
}