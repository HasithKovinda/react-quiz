import { useQuiz } from "../context/useContext";

function StartScreen() {
  const { questions, dispatch, category } = useQuiz();
  const name = category!.charAt(0).toUpperCase() + category!.slice(1);
  return (
    <div className="start">
      <h2>Welcome to The {name} Quiz!</h2>
      <h3>
        {questions.length} questions to test your {name} mastery
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
