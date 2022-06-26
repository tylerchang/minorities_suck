import './App.css';
import { hostNewGame, joinGame } from "./firebase/database";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <code>Mob Mentality</code>
          <button onClick={hostNewGame}>Hello</button>
        </p>
      </header>
    </div>
  );
}

export default App;
