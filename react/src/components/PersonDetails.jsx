/* eslint-disable react/prop-types */
import './PersonDetails.css';

export const PersonDetails = ({ person }) => {
  return (
    <section className="PersonDetails">
      <div className="nameAndImage">
        <img src={person?.picture?.large} alt={person?.name?.first} />
        <h2 className="name">{person?.name?.title} {person?.name?.first} {person?.name?.last}</h2>
      </div>
      <p><span>✉️</span>{person?.email}</p>
      <p><span>📞</span>{person?.cell}</p>
      <h3>Location</h3>
      <p>
        {person?.location?.street?.number} {person?.location?.street?.name}<br />
        {person?.location?.city} {person?.location?.coordinates?.state} {person?.location?.coordinates?.postcode} <br />
        {person?.location?.country}
      </p>
      <p>
        <a href={"https://www.google.com/maps?q=" + person?.location?.latitude + "," + person?.location?.longitude} target="_blank">Get a map</a>
      </p>
    </section>
  )
}