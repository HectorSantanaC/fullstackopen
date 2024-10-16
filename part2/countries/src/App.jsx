import { useState, useEffect } from 'react'
import countriesServices from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [information, setInformation] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    // Omitir si el país no está definido
    if (value) {
      console.log('fetching country information...')
      countriesServices
        .getAll(value)
        .then(returnedCountries => {
          const filteredCountries = returnedCountries.filter(country => 
            country.name.common.toLowerCase().includes(value.toLowerCase()))

          // Manejamos los casos en los que hay coincidencias
          if (filteredCountries.length > 10) {
            setNotification('Too many matches, specify another filter')
            setCountries([])
            setInformation(null)
          } else if (filteredCountries.length > 1) {
            setCountries(filteredCountries)
            setInformation(null)
            setNotification(null)
          } else if (filteredCountries.length === 1) {
            setCountries([])
            setInformation(filteredCountries[0])
            setNotification(null)
          }
        })
        
    } else {
      setCountries([])
      setInformation(null)
      setNotification(null)
    }
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <>
      <Filter value={value} handleChange={handleChange} />
      <Countries 
        countries={countries} 
        information={information} 
        notification={notification} 
      />
    </>
  )
}

export default App
