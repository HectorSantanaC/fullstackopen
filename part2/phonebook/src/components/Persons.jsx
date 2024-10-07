const Persons = ({ personToShow, handleDeleteName }) =>
  <>
    {personToShow.map((person) => 
      <div key={person.id}>
        {person.name} {`${person.number} `}
        <button onClick={() => handleDeleteName(person.id, person.name)}>delete</button>
      </div>
    )}
  </>

  export default Persons
  