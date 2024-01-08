import { useQuiz } from "../context/useContext";
import { IMAGE_LIST } from "../util/constant";

function Header() {
  const {process,category}= useQuiz()
  let imageName='quiz.png'
  if(process){
     imageName= IMAGE_LIST.find((img)=>img===(`${category}.png`))!
  }
  return (
    <header className='app-header'>
      <img src={imageName} alt='React logo' />
      {
        process ?<h1>The {category} Quiz</h1> :<h1>the quiz app</h1>
      }
    </header>
  );
}

export default Header;
