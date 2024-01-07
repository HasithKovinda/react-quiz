import { Dispatch, ReactNode, createContext,useEffect, useReducer } from "react";
import { NUMBER_SECOND_PER_QUESTION } from "../util/constant";


// Types definitions
export type question ={
    question:string,
    options: string [],
    correctOption:number,
    points:number
}
  
  
  type answeredQuestions ={
     questionNumber:number,
     answer:number
  }

  type questionsState ={
    questions:question []
    status:'loading' | 'error' | 'ready' | 'active' | 'finished'
    index:number,
    answer:number | null
    savedAnswers:answeredQuestions []
    points:number
    highScore:number
    secondsRemaining:number
  }

  type dispatchAction={
    dispatch:Dispatch<Action>
    numQuestions:number,
    maxPossiblePoints:number
  }

  type quizContextType=questionsState & dispatchAction

  export const QuizContext =createContext<quizContextType | null>(null)


  //Action types
  
  type fetchData ={
    type:'dataReceived',
    payload:question []
  }
  
  type fetchError={
    type:'dataError'
  }
  
  type displayQuestions={
    type:'start'
  }
  
  type markedAnswer={
    type:'newAnswer'
    payload:number
  }
  
  type moveNext={
    type:'nextQuestion'
  }
  
  type finished={
    type:'finish'
  }
  
  type reset={
    type:'restart'
  }
  
  type timer={
    type:'tick'
  }

  type goBack={
    type:'back'
  }
  
  export type Action= fetchData | fetchError | displayQuestions | markedAnswer | moveNext | finished | reset | timer | goBack
  
  
  const initialState:questionsState={
    questions:[],
    status:'loading',
    index:0,
    answer:null,
    points:0,
    highScore:0,
    savedAnswers:[],
    secondsRemaining:0
  }
  

type quizProviderProp={
    children:ReactNode
}

function reducer(state:questionsState,action:Action):questionsState{
    switch(action.type){
       case 'dataReceived':
         return {
          ...state,questions:action.payload,status:'ready'
         }
       case 'dataError':
         return{
           ...state,status:'error'
         }  
       case 'start':
         return {...state,status:'active' ,secondsRemaining:state.questions.length* NUMBER_SECOND_PER_QUESTION }  
       case 'newAnswer':{
         const currentQuestion:question = state.questions[state.index]
         return {...state,answer:action.payload,
          points:action.payload===currentQuestion.correctOption ? state.points+currentQuestion.points:state.points,
          savedAnswers:[...state.savedAnswers,{answer:action.payload,questionNumber:state.index+1}]
         } 
       }
       case 'nextQuestion':{
         let currentIndexNumber = state.index
         const questionNumber= currentIndexNumber+=2
         const result:answeredQuestions | undefined = state.savedAnswers.find((ans)=>ans.questionNumber===questionNumber)
         console.log(result)
         return {...state,index:state.index+1,answer: result===undefined ? null:result.answer}
       }
       case 'back':
          return{...state,index:state.index-1}   
       case 'finish':
         return {...state,status:'finished',highScore:state.points>state.highScore ? state.points:state.highScore}  
       case 'restart':
         return{...initialState,status:'ready',questions:state.questions, highScore:state.highScore}  
       case 'tick':
         return{...state,secondsRemaining:state.secondsRemaining-1,status:state.secondsRemaining===0 ? 'finished':state.status}   
       default:
         throw new Error("Known action")
    }
} 

function QuizProvider({children}:quizProviderProp){
 const [{status,questions,index,answer,points,highScore,secondsRemaining,savedAnswers},dispatch]=useReducer(reducer,initialState)

 const numQuestions= questions.length
 const maxPossiblePoints = questions.reduce((pre,curr)=>pre+curr.points,0)

 useEffect(()=>{
    async function fetchData(){
     try {
      const data = await fetch('http://localhost:9000/questions')
      const results = await data.json() as question []
      dispatch({type:'dataReceived',payload:results})
     }
     catch (error) {
      dispatch({type:'dataError'})
     }
    }
    fetchData()
  },[])

  return (
    <QuizContext.Provider value={{status,answer,questions,index,points,highScore,secondsRemaining, numQuestions,maxPossiblePoints,savedAnswers, dispatch}}>
        {children}
    </QuizContext.Provider>
  )
}

export default QuizProvider