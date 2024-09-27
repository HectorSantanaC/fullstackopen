const Course = ({ courses }) =>
  <>
    <h1>Web development curriculum</h1>
    {courses.map((course) => 
      <div key={course.id}>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>)}
  </>

  const Header = ({ course }) => <h2>{course.name}</h2>

  const Total = ({ parts }) => {
    const sumOfExercices = parts.reduce((sum, part) => sum + part.exercises, 0)
    
    return (
      <p><b>Total of {sumOfExercices} exercices</b></p>
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

export default Course