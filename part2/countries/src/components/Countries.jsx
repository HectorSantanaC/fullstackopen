import CountriesList from './CountriesList'
import CountryInfo from './CountryInfo'
import Notification from './Notification'

const Countries = ({ countries, information, notification, setInformation, setCountries, setNotification }) => {
  const handleShowCountry = (cca3) => {
    const country = countries.find(country => country.cca3 === cca3)
    setCountries([])
    setInformation(country)
    setNotification(null)
  }

  return (
    <>  
      {notification ? <Notification notification={notification} /> : null}
      {countries.length > 0 ? <CountriesList countries={countries} handleShowCountry={handleShowCountry}/> : null}
      {information ? <CountryInfo information={information} /> : null}
    </>
  )
}


export default Countries
