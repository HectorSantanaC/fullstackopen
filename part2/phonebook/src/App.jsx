import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

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

    const isPersonInPhonebook = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
    const isNumberInPerson = persons.some((person) => person.number === newNumber)

    if (isPersonInPhonebook && isNumberInPerson) {
      alert(`${newName} is already added to phonebook`);
    } else if (isPersonInPhonebook && !isNumberInPerson) {
      if(window.confirm(`${isPersonInPhonebook.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...isPersonInPhonebook, number: newNumber}
        const idPerson = isPersonInPhonebook.id

        personService
          .update(idPerson, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== idPerson ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(`Number changed for ${returnedPerson.name}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
        })
      }
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('') 
          setNewNumber('')
          setErrorMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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

  const handleDeleteName = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`${name} was already deleted from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
      <Persons personToShow={personToShow} handleDeleteName={handleDeleteName}/>
    </div>
  )
}

export default App
