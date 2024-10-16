const CountryInfo = ({ information }) =>
  <>
    <h1>{information.name.common}</h1>
    <p>
      capital {information.capital} <br />
      area {information.area}
    </p>
    <p><b>languages:</b></p> 
    <ul>
      {Object.values(information.languages).map(language => 
        <li key={language}>{language}</li>
      )}
    </ul>
    <img src={information.flags.png} />
  </>

export default CountryInfo
