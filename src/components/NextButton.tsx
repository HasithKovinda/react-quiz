import { type Dispatch } from "react"
import { type Action } from "../App"

type nextButtonProps = {
    dispatch:Dispatch<Action>
    answer:number | null
    index:number
    numQuestions:number
}

function NextButton({dispatch,answer,index,numQuestions}:nextButtonProps) {
  console.log(numQuestions)
  if(answer===null) return null
  if(index<numQuestions-1)
  return (
    <button className="btn btn-ui" onClick={()=>dispatch({type:'nextQuestion'})}>Next</button>
  )

  if(index===numQuestions-1)
  return (
    <button className="btn btn-ui" onClick={()=>dispatch({type:'finish'})}>Finish</button>
  )
}

export default NextButton