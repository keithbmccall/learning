import './App.css';
import reactLogo from './assets/react.svg';
import { CardMatching } from './features/card-matching/card-matching';
import { InputAutocomplete } from './features/input-autocomplete/input-autocomplete';
import { StarWars } from './features/relay-testrun/StarWars';
import { VirtualizedTable } from './features/virtualized-table/virtualized-table';
import viteLogo from '/vite.svg';

function App() {
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
        <StarWars />
        <InputAutocomplete />
        <CardMatching matchTarget={2} />
        <VirtualizedTable />
      </div>
    </>
  );
}

export default App;
