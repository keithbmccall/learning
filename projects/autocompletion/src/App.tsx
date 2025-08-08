import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import { CardMatching } from './features/card-matching/card-matching.tsx';
import { InputAutocomplete } from './features/input-autocomplete/input-autocomplete.tsx';
import viteLogo from '/vite.svg';
import { StarWars } from './features/relay-testrun/StarWars.tsx';

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
      <div className="section">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <StarWars />
        <InputAutocomplete />
        <CardMatching matchTarget={2} />
      
      </div>
    </>
  );
}

export default App;
