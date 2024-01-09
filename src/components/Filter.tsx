import { ChangeEvent, useState } from "react";
import { useQuiz } from "../context/useContext";
import { difficultyTypes } from "../types/question";

function Filter() {
  const { dispatch, totalQuestions, takeQuestions } = useQuiz();
  const [numQuestions, setNumQuestions] = useState(15);
  const [options, setOptions] = useState("easy");

  function handleOptions(event: ChangeEvent<HTMLSelectElement>): void {
    setOptions(event.target.value);
    dispatch({
      type: "difficulty",
      payload: event.target.value as difficultyTypes,
    });
    console.log(options);
  }
  function handleNumberOfQuestions(event: ChangeEvent<HTMLInputElement>): void {
    console.log(numQuestions);
    setNumQuestions(Number(event.target.value));
    dispatch({ type: "total", payload: Number(event.target.value) });
  }

  return (
    <>
      <article className="filer-section">
        <div>
          <h6>Choose Difficulty</h6>
          <select name="cars" id="cars" onChange={handleOptions}>
            <option value="all">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <h6>Select number of questions</h6>
          <input
            type="range"
            min={1}
            max={totalQuestions}
            value={takeQuestions}
            onChange={handleNumberOfQuestions}
          />
          <p>Number question selected {takeQuestions}</p>
        </div>
      </article>
    </>
  );
}

export default Filter;
