import { type ReactNode, createContext, useEffect, useReducer } from "react";
import { type dispatchAction } from "../types/action";
import { questionsState, type allQuestions } from "../types/question";
import reducer from "../reducer/reducer";
import { initialState } from "../reducer/initialState";

type quizContextType = questionsState & dispatchAction;

export const QuizContext = createContext<quizContextType | null>(null);

type quizProviderProp = {
  children: ReactNode;
};

function QuizProvider({ children }: quizProviderProp) {
  const [
    {
      status,
      questions,
      index,
      answer,
      process,
      points,
      highScore,
      secondsRemaining,
      savedAnswers,
      category,
      difficulty,
      totalQuestions,
      allQuestions,
      takeQuestions,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          "https://json-server-pied-rho.vercel.app/api/questions"
        );
        const results = (await data.json()) as allQuestions[];
        dispatch({ type: "dataReceived", payload: results });
      } catch (error) {
        dispatch({ type: "dataError" });
      }
    }
    fetchData();
  }, [category]);

  return (
    <QuizContext.Provider
      value={{
        status,
        answer,
        questions,
        index,
        points,
        highScore,
        secondsRemaining,
        savedAnswers,
        process,
        category,
        difficulty,
        totalQuestions,
        allQuestions,
        takeQuestions,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export default QuizProvider;
