import { useQuiz } from "../context/useContext";

function HighScore() {
  const { highScore, process } = useQuiz();
  if (!process) return null;
  return (
    <div className="high-score">
      <p>Your High Score:{highScore} points 🏆</p>
    </div>
  );
}

export default HighScore;
