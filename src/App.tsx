import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorComponent from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { useQuiz } from "./context/useContext";
import Content from "./components/Content";
import { Status } from "./types/eum";
import HighScore from "./components/HighScore";

function App() {
  const { status, process } = useQuiz();
  return (
    <div className="app">
      <Header />
      <HighScore />
      <Main>
        {status === Status.LOADING && <Loader />}
        {status === Status.ERROR && <ErrorComponent />}
        {status === Status.READY && (process ? <StartScreen /> : <Content />)}
        {status === Status.ACTIVE && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === Status.FINISHED && <FinishedScreen />}
      </Main>
    </div>
  );
}

export default App;
