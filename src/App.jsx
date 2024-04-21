import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [animals, setAnimals] = useState([{name:'john'}, {name:'kezia'}])

  const search = async (q) => {
    localStorage.setItem('lastQuery', q)
    const responce = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q })
    )
    const data = await responce.json()
    setAnimals(data)
  }

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery')
    search(lastQuery)
  }, [])
  
  return (
    <>
      <h1>Animal Farm</h1>

      <input type="text" onChange={(e) => search(e.target.value)}/>

      {animals && animals.map((animal) => 
        <Animal key={animal.name} {...animal} /> 
      )}
      {animals.length === 0 ? <div>No animals found</div> : null }
    </>
  )
}

function Animal({type, name, age}){
  return <>
        <li>
          <strong>{type}</strong>{name}{age}
        </li>
  </>
}

export default App
