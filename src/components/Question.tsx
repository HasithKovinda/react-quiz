import { type Dispatch } from "react"
import { type Action, type question } from "../App"
import Options from "./Options"

type questionProps = {
    loadQuestion:question
    dispatch:Dispatch<Action>
    answer:number|null
}

function Question({loadQuestion,dispatch,answer}:questionProps) {
  return (
    <div>
        <h4>{loadQuestion.question}</h4>
        <Options question={loadQuestion} dispatch={dispatch} answer={answer} />
    </div>
  )
}

export default Question