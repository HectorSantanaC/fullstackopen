const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ parts }) => {
  const sumOfExercices = parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return (
    <p>Number of exercises {sumOfExercices}</p>
  )
}

const Part = ({ part }) => 
  <p key={part.id}>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((part) => 
      <Part key={part.id} part={part} />)}
  </>

const Course = ({ course }) =>
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
