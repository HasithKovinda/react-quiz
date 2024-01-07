import { type questions } from "../App"
import Options from "./Options"

type questionProps = {
    loadQuestion:questions
}

function Question({loadQuestion}:questionProps) {
  return (
    <div>
        <h4>{loadQuestion.question}</h4>
        <Options question={loadQuestion} />
    </div>
  )
}

export default Question