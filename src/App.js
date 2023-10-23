import "./App.css";
import { Cell } from "./components";

function App() {
  const length = 10;
  const matrix = Array.from({ length: length }, () =>
    Array.from({ length: length }, () => 1)
  );
  return (
    <div className="App">
      {matrix.map((matrixLine, lineIndex) => {
        return (
          <div className="line-container">
            {matrixLine.map((element, columnIndex) => (
              <Cell key={`${lineIndex}-${columnIndex}`} value={element} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default App;
