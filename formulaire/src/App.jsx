import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Counter(props) {
  const {count, setCount} = props
  return  <div className="card">
        <button onClick={() => setCount((count) => count+1)}>
          count is {count}
        </button>
      </div>
}


function App() {
  const [count, setCount] = useState(0)

  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('1A'); // valeur initiale

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Formulaire</h1>
        <div>
          <form>
            <label>
              Prénom :
              <input type="text" value={name} onChange={handleNameChange} />
            </label>
          </form>
      
          <form>
            <label>
              Nom :
              <input type="text" value={lastname} onChange={handleLastNameChange} />
            </label>
          </form>
          <form>
            <label>
              Adresse mail :
              <input type="text" value={email} onChange={handleEmailChange} />
            </label>
          </form>
          <form>
            <label>
            Année d'étude :
              <select value={year} onChange={handleYearChange}>
                <option value="1A">1re année</option>
                <option value="2A">2e année</option>
                <option value="3A">3e année</option>
              </select>
            </label>
          </form>
        </div>
      <Counter count={count} setCount={setCount}/>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}


export default App
