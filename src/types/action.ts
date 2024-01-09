import { type Dispatch } from "react";
import {
  type difficultyTypes,
  type allQuestions,
  catagoriesTypes,
} from "./question";

//dispatch action type
export type dispatchAction = {
  dispatch: Dispatch<Action>;
  // numQuestions:number,
  // maxPossiblePoints:number
};

//Action types
type fetchData = {
  type: "dataReceived";
  payload: allQuestions[];
};

type fetchError = {
  type: "dataError";
};

type displayQuestions = {
  type: "start";
};

type markedAnswer = {
  type: "newAnswer";
  payload: number;
};

type moveNext = {
  type: "nextQuestion";
};

type finished = {
  type: "finish";
};

type reset = {
  type: "restart";
};

type timer = {
  type: "tick";
};

type goBack = {
  type: "back";
};

//Think optimized
type category = {
  type: "selectCategory";
  payload: catagoriesTypes;
};

type difficulty = {
  type: "difficulty";
  payload: difficultyTypes;
};

type totalQuestions = {
  type: "total";
  payload: number;
};

type process = {
  type: "process";
};

type changeCategory = {
  type: "changeCategory";
};

// types of Actions in reducer function
export type Action =
  | fetchData
  | fetchError
  | displayQuestions
  | markedAnswer
  | moveNext
  | finished
  | reset
  | timer
  | goBack
  | category
  | difficulty
  | totalQuestions
  | process
  | changeCategory;
