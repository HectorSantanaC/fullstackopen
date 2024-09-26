import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Title = ({ text }) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initializePoints = (numAnecdotes) => {
    const points = {}
    for (let i = 0; i < numAnecdotes; i++) {
      points[i] = 0
    }
    return points
  }

  const mostPoints = (points) => {
    let maxPoints = 0
    let anecdoteIndex = 0

    for (const i in points) {
      if (points[i] > maxPoints) {
        maxPoints = points[i]
        anecdoteIndex = i
      }
    }

    return anecdoteIndex
  }

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initializePoints(anecdotes.length))

  const handleNextAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    console.log(random)
    setSelected(random)
  }

  const handleVote = () => {
    const copy = { ...points }
    copy[selected] += 1
    console.log(copy)
    setPoints(copy)
  }

  const anecdoteMostPointsIndex = mostPoints(points)

  return (
    <div>
      <Title text={'Anecdote of the day'} />
      <p>
        {anecdotes[selected]} <br />
        has {points[selected]} votes
        <Button onClick={handleVote} text={'vote'} />
        <Button onClick={handleNextAnecdote} text={'next anecdote'} />
      </p>
      <Title text={'Anecdote with most votes'} />
      <p>
        {anecdotes[anecdoteMostPointsIndex]} <br />
        has {points[anecdoteMostPointsIndex]} votes
      </p>
    </div>
  )
}

export default App
