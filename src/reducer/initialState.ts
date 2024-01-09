import { Difficulty, Status } from "../types/eum";
import { type questionsState } from "../types/question";
import {
  MAX_NUMBER_OF_QUESTIONS,
  MAX_NUMBER_OF_TAKE_QUESTIONS,
} from "../util/constant";

export const initialState: questionsState = {
  allQuestions: [],
  questions: [],
  status: Status.LOADING,
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  savedAnswers: [],
  secondsRemaining: 0,
  category: null,
  difficulty: Difficulty.ALL,
  totalQuestions: MAX_NUMBER_OF_QUESTIONS,
  takeQuestions: MAX_NUMBER_OF_TAKE_QUESTIONS,
  process: false,
};
