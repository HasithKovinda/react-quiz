import { Status } from "./eum";

//single question type
export type question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  difficulty: string;
};

// answered question type
export type answeredQuestions = {
  questionNumber: number;
  answer: number;
};

// shape of the questions received from the API
export type allQuestions = {
  category: catagoriesTypes;
  all_questions: question[];
};

export type difficultyTypes = "all" | "easy" | "medium" | "hard";

export type catagoriesTypes =
  | "html"
  | "css"
  | "javascript"
  | "react"
  | "typescript";

export type questionsState = {
  allQuestions: allQuestions[];
  questions: question[];
  status:
    | Status.LOADING
    | Status.ERROR
    | Status.READY
    | Status.ACTIVE
    | Status.FINISHED;
  index: number;
  answer: number | null;
  savedAnswers: answeredQuestions[];
  points: number;
  highScore: number;
  secondsRemaining: number;
  category: catagoriesTypes | null;
  difficulty: difficultyTypes;
  totalQuestions: number;
  takeQuestions: number;
  process: boolean;
};
