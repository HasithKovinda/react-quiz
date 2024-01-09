import { useQuiz } from "../context/useContext"


function Progress() {
  const{index,questions,points,answer} = useQuiz()
   const maxPossiblePoints = questions.reduce((pre,curr)=>pre+curr.points,0)
  return (
    <header className="progress">
    <progress max={questions.length} value={index + Number(answer !== null)} />

    <p>
      Question <strong>{index + 1}</strong> / {questions.length}
    </p>

    <p>
      <strong>{points}</strong> / {maxPossiblePoints}
    </p>
  </header>
  )
}

export default Progress