import CountriesList from './CountriesList'
import CountryInfo from './CountryInfo'
import Notification from './Notification'

const Countries = ({ countries, information, notification }) => 
  <>  
    {notification ? <Notification notification={notification} /> : null}
    {countries.length > 0 ? <CountriesList countries={countries} /> : null}
    {information ? <CountryInfo information={information} /> : null}
  </>

export default Countries
