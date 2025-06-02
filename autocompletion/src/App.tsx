import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import { CardMatching } from './feature/card-matching/card-matching';
import { InputAutocomplete } from './feature/input-autocomplete/input-autocomplete';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

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
      <h1>Vite x React</h1>
      <div className="section">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <InputAutocomplete />
        <CardMatching matchTarget={2} />
      </div>
    </>
  );
}

export default App;
