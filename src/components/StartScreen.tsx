import { type Dispatch } from "react"
import { Action } from "../App"

type startScreenProps ={
    numQuestions:number,
    dispatch:Dispatch<Action>
}
function StartScreen({numQuestions,dispatch}:startScreenProps) {
  return (
    <div className="start">
    <h2>Welcome to The React Quiz!</h2>
    <h3>{numQuestions} questions to test your React mastery</h3>
    <button
      className="btn btn-ui"
      onClick={()=>dispatch({type:'start'})}
    >
      Let's start
    </button>
  </div>
  )
}

export default StartScreen