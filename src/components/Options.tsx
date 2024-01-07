import { type Dispatch } from "react"
import { type Action, type question} from "../App"
type optionProps = {
    question:question
    dispatch:Dispatch<Action>
    answer:number|null
}

function Options({question,dispatch,answer}:optionProps) {
  const hasAnswered = answer!==null  
  return (
    <div className="options">
        {
          question.options.map((option,index)=>{
            return <button className={`btn btn-option ${index === answer ? 'answer' :''}  ${hasAnswered ? index===question.correctOption ? 'correct':'wrong':''} `}
            key={option}
            disabled={hasAnswered} 
            onClick={()=>dispatch({type:'newAnswer',payload:index})}>{option}</button>
        })
        }
    </div>
  )
}

export default Options