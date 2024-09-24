import { useState } from 'react'

const Tittle = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = ({ good, neutral, bad }) => {
  return (
    <p>
      Good {good} <br />
      Neutral {neutral} <br />
      Bad {bad}
    </p>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Tittle text={'Give feedback'} />
      <Button onClick={() => setGood(good + 1)} text={'Good'} />
      <Button onClick={() => setNeutral(neutral + 1)} text={'Neutral'} />
      <Button onClick={() => setBad(bad + 1)} text={'Bad'} />
      <Tittle text={'Statistics'} />
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
