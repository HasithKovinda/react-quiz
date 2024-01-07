import { useContext } from "react";
import { QuizContext } from "./context";

export function useQuiz(){
    const context = useContext(QuizContext)
    if(context===null || context===undefined){
        throw new Error("QuizContext was used outside of the QuizProvider");
    }
    return context
}
