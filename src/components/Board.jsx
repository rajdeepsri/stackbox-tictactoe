import { useState, useEffect, useCallback } from "react";
import Box from "./Box";

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cleanBoard = Array(9).fill(null);

const Board = ({ playerSymbol, setPlayerSymbol }) => {
  const [board, setBoard] = useState(cleanBoard);
  const [userPlaying, setUserPlaying] = useState(true);
  const [winner, setWinner] = useState(null);

  // Function to check if the board is filled
  const getIsBoardFilled = (board) => board.every((val) => val !== null);

  // Function to check for a winner based on winning conditions
  const checkWinner = (board) => {
    for (const condition of winConditions) {
      const [x, y, z] = condition;

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
  };

  // Function to check if user has won the game
  const handleMove = (updatedBoard) => {
    const whoWon = checkWinner(updatedBoard);
    if (whoWon) {
      const winner = whoWon === playerSymbol ? "User" : "Computer";
      setWinner(winner);
    }
  };

  // Function to handle click on a box
  const handleUserBoxClick = (boxIndex) => {
    if (!playerSymbol || !userPlaying || winner) return;

    let clickedOnNewBox = true;
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIndex) {
        if (!board[idx]) {
          return playerSymbol;
        } else {
          clickedOnNewBox = false;
        }
      } else {
        return value;
      }
    });

    // Check if user won
    handleMove(updatedBoard);

    if (clickedOnNewBox) {
      setBoard(updatedBoard);
      setUserPlaying(false);
    }
  };

  useEffect(() => {
    // check if the board is filled
    const isBoardFilled = getIsBoardFilled(board);

    const makeComputerMove = async () => {
      if (!playerSymbol && isBoardFilled && winner) return;
      const response = await fetch(
        "https://hiring-react-assignment.vercel.app/api/bot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(board),
        }
      );
      const computerMove = await response.json();

      // Update the board with the computer's move
      const updatedBoard = [...board];
      if (!updatedBoard[computerMove]) {
        updatedBoard[computerMove] = playerSymbol === "X" ? "O" : "X";
        // Check if the computer won after the move
        handleMove(updatedBoard);
        setBoard(updatedBoard);
      }
      setUserPlaying(true);
    };

    if (!userPlaying && playerSymbol && !isBoardFilled && !winner) {
      makeComputerMove();
    }
  }, [userPlaying]);

  // Function to reset the game
  const resetGame = () => {
    setBoard(cleanBoard);
    setPlayerSymbol(null);
    setUserPlaying(true);
    setWinner(null);
  };

  // Check if the game is tied
  const gameTied = getIsBoardFilled(board) && winner === null;

  return (
    <>
      <div className="board">
        {board.map((value, idx) => (
          <Box
            key={idx}
            onClick={() => handleUserBoxClick(idx)}
            value={value}
          />
        ))}
      </div>
      {gameTied === true && <p>No one won, IT'S A TIE!</p>}
      {winner && <p>{winner} won the game!</p>}
      {playerSymbol && (
        <button className="reset" onClick={resetGame}>
          Reset Game
        </button>
      )}
    </>
  );
};

export default Board;
