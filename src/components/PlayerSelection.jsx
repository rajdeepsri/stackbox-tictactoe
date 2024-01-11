const PlayerSelection = ({ setPlayerSymbol }) => {
  return (
    <div className="player-btns">
      <button onClick={() => setPlayerSymbol("X")}>select X</button>
      <button onClick={() => setPlayerSymbol("O")}>select O</button>
    </div>
  );
};

export default PlayerSelection;
