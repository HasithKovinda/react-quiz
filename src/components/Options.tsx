import { useQuiz } from "../context/useContext";
import { question } from "../types/question";

type optionProps = {
  question: question;
};

function Options({ question }: optionProps) {
  const { answer, dispatch } = useQuiz();
  const hasAnswered = answer !== null;
  // const a= savedAnswers.filter((ans)=>ans.questionNumber===index+1)
  // console.log('a',a)
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""}  ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            } `}
            key={option}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
