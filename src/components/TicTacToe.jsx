import { useState } from "react";
import Board from "./Board";
import PlayerSelection from "./PlayerSelection";

const TicTacToe = () => {
  // State to track the User's choice, either X or O
  const [playerSymbol, setPlayerSymbol] = useState(null);

  return (
    <>
      {playerSymbol ? (
        <p>You have selected {playerSymbol}</p>
      ) : (
        <PlayerSelection setPlayerSymbol={setPlayerSymbol} />
      )}
      <Board playerSymbol={playerSymbol} setPlayerSymbol={setPlayerSymbol} />
    </>
  );
};

export default TicTacToe;
