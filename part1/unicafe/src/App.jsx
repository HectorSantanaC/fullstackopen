import { useState } from 'react'

const Tittle = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) =>  
<tr>
  <td>{text}</td>
  <td>{value}</td>
</tr>

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all == 0) {
    return <p>No feedback given</p> 
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text='Good'value={good} />
          <StatisticLine text='Neutral'value={neutral} />
          <StatisticLine text='Bad'value={bad} />
          <StatisticLine text='All'value={all} />
          <StatisticLine text='Average'value={average} />
          <StatisticLine text='Positive'value={positive + " %"} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad

  return (
    <div>
      <Tittle text={'Give feedback'} />
      <Button onClick={() => setGood(good + 1)} text={'Good'} />
      <Button onClick={() => setNeutral(neutral + 1)} text={'Neutral'} />
      <Button onClick={() => setBad(bad + 1)} text={'Bad'} />
      <Tittle text={'Statistics'} />
      <Statistics 
        good={good}
        neutral={neutral} 
        bad={bad} 
        all={all} 
        average={(good - bad) / all} 
        positive={(good * 100) / all} 
      />
    </div>
  )
}

export default App
