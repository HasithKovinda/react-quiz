
import Header from "./components/Header"
import Main from "./components/Main"
import Loader from "./components/Loader"
import ErrorComponent from "./components/Error"
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"
import NextButton from "./components/NextButton"
import Progress from "./components/Progress"
import FinishedScreen from "./components/FinishedScreen"
import Footer from "./components/Footer"
import Timer from "./components/Timer"
import { useQuiz } from "./context/useContext"
import Content from "./components/Content"

function App() {
  const{status,process}= useQuiz()
  return (
    <div className="app">
     <Header/>
     <Main>
       {status==='loading' && <Loader/>}
       {status==='error' && <ErrorComponent/>}
       {status==='ready' && (process ? <StartScreen/>:<Content/>)}
       {status==='active' && 
        <>
         <Progress/>
         <Question />
         <Footer>
         <Timer />
         <NextButton/>
         </Footer>
        </>
       }
       {status==='finished' && <FinishedScreen/>}
     </Main>
    </div>
  )
}

export default App
