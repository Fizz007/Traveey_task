import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import QuestionComponent from "./QuestionComponent";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";

const Questions = ({ finish, score }) => {
  const [questions, setQuestions] = useState([]);
  const [curr, setCurr] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submission, setSubmission] = useState("");
  const [finalSubmission, setFinalSubmission] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      if (!response.ok) {
        throw new Error(await response.json());
      }
      const data = await response.json();
      const { results } = data;

      setQuestions(
        results.map((e) => ({
          ...e,
          options: [e.correct_answer, ...e.incorrect_answers].sort(
            () => Math.random() - 0.5
          ),
        }))
      );

      setFinalSubmission(results.map(() => ""));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(submission)
  return (
    <>
      <div className="h-[100vh] bg-gray-800 text-white">
        <div className="mx-40 h-[80vh] pt-[10vh]">
          {isLoading && (
            <div className="w-max-content mx-auto">
              <Spinner />
            </div>
          )}

          {questions[curr] && !isLoading && (
            <QuestionComponent
              que={questions[curr]}
              submit={(res) => setSubmission(res)}
              submission={submission}
            />
          )}
        </div>
        <div className="flex justify-between mx-auto gap-16 w-[200px]">

          <button
            className={`bg-white p-2 rounded-lg text-gray-500 cursor-pointer ${
              curr <= 0 ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => setCurr((prev) => prev - 1)}
            disabled={curr <= 0}
          >
            <AiOutlineDoubleLeft size={25} />
          </button>

          {curr === questions.length - 1 &&
          finalSubmission[finalSubmission.length - 1] !== "" ? (
            <button
              className="text-sm bg-blue-500 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out cursor-pointer"
              onClick={() => {
                let s = 0;
                questions.forEach((q, index) => {
                  // if (q.correct_answer === finalSubmission[index]){
                  //   s += 5;
                  // } else{
                  //   s -= 1;
                  // }
                  (q.correct_answer === finalSubmission[index]) ? s+=5 : s-=1 
                  
                });
                // console.log(questions.map(q => q.correct_answer));
                // console.log(finalSubmission);

                score(s);
                finish(true);
              }}
            >
              Finish
            </button>
          ) : (
            <button
              className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer transform hover:scale-105"
              onClick={() => {
                setFinalSubmission((prev) => {
                  const newArr = [...prev];
                  newArr[curr] = submission;
                  return newArr;
                });
              }}
            >
              Submit
            </button>
          )}
          <button
            className={`text-sm bg-white p-2 rounded-lg text-gray-500 cursor-pointer ${
                (curr >= questions.length - 1) || finalSubmission[curr] === "" ? 'opacity-50 pointer-events-none' : ''
              }`}
            onClick={() => {
              setSubmission("");
              setCurr((prev) => prev + 1);
            }}
            disabled={
              curr >= questions.length - 1 || finalSubmission[curr] === ""
            }
          >
            <AiOutlineDoubleRight size={25} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Questions;
