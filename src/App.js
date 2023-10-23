import "./App.css";
import { Cell, Button } from "./components";

function App() {
  const length = 100;
  const matrix = Array.from({ length: length }, () =>
    Array.from({ length: length }, () => 1)
  );
  return (
    <div className="App">
      <div className="header-btns-container">
        <Button
          className="matrix-action-btn"
          onPress={() => console.log("puk")}
          text="Старт-стоп ячейки"
        />
        <Button
          className="matrix-action-btn"
          onPress={() => console.log("puk2")}
          text="Заблокировать ячейки"
        />
      </div>
      <div className="matrix-container">
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
      <Button
        className="start-path-btn"
        onPress={() => alert("Маршрут")}
        text="Построить маршрут"
      />
    </div>
  );
}

export default App;
