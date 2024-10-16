const CountriesList = ({ countries, handleShowCountry }) => 
  <ul>
    {countries.map(country => (
      <div>
        <li key={country.cca3}>
          {country.name.common} 
          <button onClick={() => handleShowCountry(country.cca3)}>
            show
          </button>
        </li>
      </div>
      
    ))}
  </ul>

export default CountriesList
