import { useState } from 'react'
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import './App.css'


function Square({ turnState, setTurn, boardState, setBoardState, i }) {

  const [clickState, setClicked] = useState("");
  //false means player 1, true means player 2

  return (
    <>
      <button
        className="border-2 border-sky-500 w-16 h-16 bg-grey-300 rounded-lg shadow-md text-sky-500 border-sky-500 text-bold text-sans"
        onClick={() => {
          if (clickState === "") {
            setClicked(turnState ? "O" : "X");
            setTurn((prevTurn) => !prevTurn);
            setBoardState((prevState) => {
              const newState = [...prevState];
              newState[i] = turnState ? "X" : "O";
              console.log(newState);

              return newState;

            });
          }
        }
      }
      >
        {clickState}
      </button>

    </>
  )
}

function Board({ turnState, setTurn, setWinText }) {

  const [boardState, setBoardState] = useState(Array(9).fill(""));
  // Initialize the board state with empty strings
  // This will hold the state of each square in the tic-tac-toe board
  // The board is a 3x3 grid, so we can use an array of length 9
  // Win check logic
  function checkWinner(board) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  // useEffect runs when boardState changes
  useEffect(() => {
    const winner = checkWinner(boardState);
    if (winner) {
      setWinText("Player " + (winner === "X" ? "2" : "1") + " wins!");
    }
  }, [boardState]);
  return (
    <>
      {/* //Row 1 */}
      <div className="flex justify-center items-center ">
        <Square turnState={turnState} setTurn={setTurn} boardState={boardState} setBoardState={setBoardState} i={0} />
        <Square turnState={turnState} setTurn={setTurn} boardState={boardState} setBoardState={setBoardState} i={1} />
        <Square turnState={turnState} setTurn={setTurn} boardState={boardState} setBoardState={setBoardState} i={2} />
      </div>

      {/* //Row 2 */}
      <div className="flex justify-center items-center ">
        <Square turnState={turnState} setTurn={setTurn} boardState={boardState} setBoardState={setBoardState} i={3} />
        <Square turnState={turnState} setTurn={setTurn} boardState={boardState} setBoardState={setBoardState} i={4} />
        <Square turnState={turnState} setTurn={setTurn} boardState={boardState} setBoardState={setBoardState} i={5} />
      </div>
      {/* //Row 3 */}
      <div className="flex justify-center items-center ">
        <Square turnState={turnState} setTurn={setTurn} boardState={boardState} setBoardState={setBoardState} i={6} />
        <Square turnState={turnState} setTurn={setTurn} boardState={boardState} setBoardState={setBoardState} i={7} />
        <Square turnState={turnState} setTurn={setTurn} boardState={boardState} setBoardState={setBoardState} i={8} />
      </div>

    </>
  )
}

function App() {
  const [count, setCount] = useState(0);
  const [winText, setWinText] = useState("No Winner Yet!");

  // const [smallText, setSmallText] = useState(false);
  const [turnState, setTurn] = useState(false);
  return (

    <>
    <Slider className= "bg-blue-500"defaultValue={[33]} max={100} step={1} />
      <div className=" justify-center items-center h-screen bg-gradient-to-r from-gray-800 to-gray-950">
        <div className="m-6 p-6 bg-blue-500 text-white rounded-2xl font-sans max-w-sm mx-auto shadow-lg space-y-6">
          <div className="flex justify-between items-center">
            <button
              className="bg-white text-blue-500 px-4 py-2 rounded-md font-semibold shadow hover:bg-blue-100 transition duration-200"
              onClick={() => setCount((count) => count - 1)}
            >
              -1
            </button>

            <p className="text-4xl font-bold">{count}</p>

            <button
              className={"bg-white text-blue-500 px-4 py-2 rounded-md font-semibold shadow hover:bg-blue-100 transition duration-200 "}
              onClick={() => {
                setCount((count) => count + 1);
                // setSmallText(prev => !prev);
              }}
            >
              +1
            </button>

          </div>
        </div >


        <h1 className="bg-sky-500 m-6 p-6 rounded-2xl font-sans font-semibold shadow text-navy-700 max-w-sm mx-auto">
          PLAYER: <span className="font-bold text-white">{turnState ? "2" : "1"}</span>
        </h1>
        <div className="m-6 p-6 bg-navy-300 rounded-2xl font-sans shadow-lg">


          <Board turnState={turnState} setTurn={setTurn} setWinText={setWinText} />
          <h2 className="text-center text-xl font-bold mt-4">{winText}</h2>
        </div>
      </div>
    </>
  )
}

export default App
