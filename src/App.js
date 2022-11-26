import "./App.css";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import Die from "./Die";

function App() {
  const [dice, setDice] = useState([]);
  const [tenzis, setTenzis] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {}, []);
  const startGame = () => {
    setCount(0);
    setTenzis(false);
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push({ value: randomDieValue(), isHeld: false, id: i });
    }
    setDice(newArr);
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (dice.length > 1) {
      const firstValue = dice[0].value;
      if (dice.every((item) => item.value === firstValue && item.isHeld)) {
        setTenzis(true);
      }
    }
  }, [dice]);

  function randomDieValue() {
    return Math.ceil(Math.random() * 6);
  }

  const rollDice = () => {
    // console.log(tenzis);
    if (tenzis) {
      // console.log("starting again");
      startGame();
    } else {
      setCount((prev) => prev + 1);
      setDice((prev) =>
        prev.map((item) =>
          item.isHeld ? item : { ...item, value: randomDieValue() }
        )
      );
    }
  };
  const heldDie = (id) => {
    setDice((prev) =>
      prev.map((item) => {
        //   console.log(item.id);
        //   console.log(`this is id ${id}`);
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  };

  const diceElements = dice.map((item) => (
    <Die
      key={item.id}
      id={item.id}
      value={item.value}
      isHeld={item.isHeld}
      toggle={heldDie}
    />
  ));

  return (
    <div className="App">
      {tenzis && <Confetti />}
      <h1 className="title">Tenzis</h1>
      <p className="description">
        {tenzis
          ? `congratulation you won in ${count} roll`
          : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
      </p>
      <div className="diceContainer">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzis ? "start again" : "roll"}
      </button>
    </div>
  );
}

export default App;
