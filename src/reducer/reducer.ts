import { initialState } from "./initialState";
import { Difficulty, Status } from "../types/eum";
import { Action } from "../types/action";
import { questionsState, question, answeredQuestions } from "../types/question";
import {
  MAX_NUMBER_OF_QUESTIONS,
  MAX_NUMBER_OF_TAKE_QUESTIONS,
  NUMBER_SECOND_PER_QUESTION,
} from "../util/constant";

function reducer(state: questionsState, action: Action): questionsState {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        allQuestions: action.payload,
        status: Status.READY,
      };
    case "dataError":
      return {
        ...state,
        status: Status.ERROR,
      };
    case "selectCategory": {
      const res = state.allQuestions.find(
        (ques) => ques.category === action.payload
      )!;
      return {
        ...state,
        category: action.payload,
        questions: res.all_questions,
      };
    }
    case "difficulty": {
      const totalQuestions = state.questions.filter(
        (ques) => ques.difficulty === action.payload
      );
      const length =
        action.payload === Difficulty.ALL
          ? state.questions.length
          : totalQuestions.length;
      return {
        ...state,
        difficulty: action.payload,
        totalQuestions: length,
        takeQuestions: length,
      };
    }
    case "total":
      return { ...state, takeQuestions: action.payload };

    case "changeCategory":
      return {
        ...state,
        difficulty: Difficulty.ALL,
        totalQuestions: MAX_NUMBER_OF_QUESTIONS,
        takeQuestions: MAX_NUMBER_OF_TAKE_QUESTIONS,
      };

    case "process": {
      let newQuestions: question[] = [];
      const takeQuestionLen = state.takeQuestions;
      const difficulty = state.difficulty;
      let filterByDiff = state.questions.filter(
        (ques) => ques.difficulty === difficulty
      );
      console.log(state.difficulty);
      state.difficulty === Difficulty.ALL
        ? (filterByDiff = state.questions)
        : filterByDiff;
      console.log(filterByDiff);
      if (filterByDiff.length === takeQuestionLen) {
        newQuestions = filterByDiff;
      } else {
        for (let i = 0; i < state.takeQuestions; i++) {
          newQuestions.push(filterByDiff[i]);
        }
      }
      return { ...state, questions: newQuestions, process: true };
    }
    case "start":
      return {
        ...state,
        status: Status.ACTIVE,
        secondsRemaining: state.questions.length * NUMBER_SECOND_PER_QUESTION,
      };
    case "newAnswer": {
      const currentQuestion: question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
        savedAnswers: [
          ...state.savedAnswers,
          { answer: action.payload, questionNumber: state.index + 1 },
        ],
      };
    }
    case "nextQuestion": {
      let currentIndexNumber = state.index;
      const questionNumber = (currentIndexNumber += 2);
      const result: answeredQuestions | undefined = state.savedAnswers.find(
        (ans) => ans.questionNumber === questionNumber
      );
      return {
        ...state,
        index: state.index + 1,
        answer: result === undefined ? null : result.answer,
      };
    }
    case "back": {
      const result: answeredQuestions | undefined = state.savedAnswers.find(
        (ans) => ans.questionNumber === state.index
      );
      return {
        ...state,
        index: state.index - 1,
        answer: result === undefined ? null : result.answer,
      };
    }
    case "finish":
      return {
        ...state,
        status: Status.FINISHED,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        status: Status.READY,
        questions: state.questions,
        highScore: state.highScore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? Status.FINISHED : state.status,
      };
    default:
      throw new Error("Known action");
  }
}

export default reducer;
