import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const isPersonInPhonebook = persons.some((person) => person.name === newName)

    if (isPersonInPhonebook) {
      alert(`${newName} is already added to phonebook`);
    } else {
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('') 
        setNewNumber('')
      })
    }
  }

  const personToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearchChange} />

      <h3>add a new</h3>
      <PersonForm 
        addName={addName}
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />

      <h3>Numbers</h3>
      <Persons personToShow={personToShow}/>
    </div>
  )
}

export default App