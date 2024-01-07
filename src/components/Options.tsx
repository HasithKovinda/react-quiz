import { type questions } from "../App"

type optionProps = {
    question:questions
}

function Options({question}:optionProps) {
  return (
    <div className="options">
        {
            question.options.map((option)=>{
                return <button className="btn btn option" key={option}>{option}</button>
            })
        }
    </div>
  )
}

export default Options