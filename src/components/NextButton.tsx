
import { ReactNode } from "react"
import { useQuiz } from "../context/useContext"

function NextButton() {
  const{answer,index,questions,dispatch} =useQuiz()
  const btnElement:ReactNode=<button className="btn btn-ui" onClick={()=>dispatch({type:'back'})}>Backs</button>
  if(answer===null) return index===0 ? null :btnElement 
  return (
    <>
    {(index===questions.length-1)&& <button className="btn btn-ui" onClick={()=>dispatch({type:'finish'})}>Finish</button>}
    {index<questions.length-1 && <button className="btn btn-ui" onClick={()=>dispatch({type:'nextQuestion'})}>Next</button> } 
    {(index>0 && index<=questions.length-1) && btnElement } 
    </>
    
  )

}

export default NextButton