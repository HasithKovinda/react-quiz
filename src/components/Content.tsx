import { useQuiz } from "../context/useContext"
import ImagesSection from "./ImagesSection"
import SubHeading from "./SubHeading"

function Content() {
  const{category}= useQuiz()
  return (
    <div className="content">
      {!category && <SubHeading/>}
      <ImagesSection/>
    </div>
  )
}

export default Content