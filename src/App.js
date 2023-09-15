import { useState } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Questions from "./components/Questions";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [score, setScore] = useState(0);

  function handleStart(value) {
    console.log(value);
    setStart(value);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <ChakraProvider>
        <div className="overflow-hidden h-[100vh]">
          <div
            className={`mx-auto w-5xl h-[100vh] pt-32vh mt-[${
              start ? "-100vh" : "0vh"
            }] transition-all duration-150 ease-in`}
          >
            <Welcome handleStart={handleStart} />
          </div>

          <div
            className={`max-h-screen mt-[${
              finish ? "-100vh" : "0vh"
            }] transition-all duration-150 ease-in-out`}
          >
            {start && <Questions finish={setFinish} score={setScore} />}
          </div>

          <div className="h-[100vh] pt-[30vh] bg-gray-800 text-white">
            <p className="text-center ">You scored</p>
            <p className="text-center text-7xl font-extrabold">{score}/50</p>
          </div>
        </div>
      </ChakraProvider>
    </>
  );
}

export default App;
