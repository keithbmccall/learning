import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { InputAutocomplete } from "./feature/input-autocomplete/input-autocomplete";
import { CardMatching } from "./feature/card-matching/card-matching";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite x React</h1>
            <div className="section">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <InputAutocomplete />
                <CardMatching />
            </div>
        </>
    );
}

export default App;
