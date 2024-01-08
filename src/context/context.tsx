import { Dispatch, ReactNode, createContext,useEffect, useReducer } from "react";
import { NUMBER_SECOND_PER_QUESTION } from "../util/constant";


// Types definitions
export type question ={
    question:string,
    options: string [],
    correctOption:number,
    points:number,
    difficulty:string
}
  
  
  type answeredQuestions ={
     questionNumber:number,
     answer:number
  }

  type allQuestions={
    category:'string',
    all_questions:question []
  }

  type questionsState ={
    allQuestions:allQuestions []
    questions:question []
    status:'loading' | 'error' | 'ready' | 'active' | 'finished'
    index:number,
    answer:number | null
    savedAnswers:answeredQuestions []
    points:number
    highScore:number
    secondsRemaining:number
    category: string | null
    difficulty:string
    totalQuestions:number,
    takeQuestions:number
    process:boolean
  }


  //'react' | 'html' | 'css' | 'javascript' | 'typescript'
  //'easy' | 'medium' | 'hard'


  type dispatchAction={
    dispatch:Dispatch<Action>
    // numQuestions:number,
    // maxPossiblePoints:number
  }

  type quizContextType=questionsState & dispatchAction

  export const QuizContext =createContext<quizContextType | null>(null)


  //Action types
  
  type fetchData ={
    type:'dataReceived',
    payload:allQuestions []
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

  //Think optimized
  type category={
    type:'selectCategory'
    payload:string
  }

  type difficulty={
    type:'difficulty'
    payload:string
  }

  type totalQuestions={
    type:'total'
    payload:number
  }

  type process={
    type:'process'
  }

  type changeCategory={
    type:'changeCategory'
  }
  
  export type Action= fetchData | fetchError | displayQuestions | markedAnswer | moveNext | finished | reset | timer | goBack | category | difficulty | totalQuestions | process |changeCategory
  
  
  const initialState:questionsState={
    allQuestions:[],
    questions:[],
    status:'loading',
    index:0,
    answer:null,
    points:0,
    highScore:0,
    savedAnswers:[],
    secondsRemaining:0,
    category:null,
    difficulty:'all',
    totalQuestions:15,
    takeQuestions:15,
    process:false
  }
  

type quizProviderProp={
    children:ReactNode
}

function reducer(state:questionsState,action:Action):questionsState{
    switch(action.type){  
       case 'dataReceived':
         return {
          ...state,allQuestions:action.payload,status:'ready'
         }
       case 'dataError':
         return{
           ...state,status:'error'
         } 
        case 'selectCategory':{
          const res= state.allQuestions.find((ques)=>ques.category===action.payload)!
          return {...state,category:action.payload,questions:res.all_questions}
        }
        case 'difficulty':{
          const totalQuestions = state.questions.filter((ques)=>ques.difficulty===action.payload)
          const length = action.payload==='all' ? state.questions.length : totalQuestions.length
          return {...state,difficulty:action.payload,totalQuestions:length,takeQuestions:length}  
        }
        case 'total':
           return {...state,takeQuestions:action.payload}    
        
        case 'changeCategory':
          return {...state,difficulty:'all',totalQuestions:15,takeQuestions:15}   
           
        case 'process':{
          let newQuestions:question []=[]
          const takeQuestionLen = state.takeQuestions
          const difficulty = state.difficulty
          let filterByDiff = state.questions.filter((ques)=>ques.difficulty=== difficulty)
          console.log(state.difficulty)
          state.difficulty==='all' ? filterByDiff=state.questions : filterByDiff
          console.log(filterByDiff)
          if(filterByDiff.length===takeQuestionLen){
            newQuestions=filterByDiff
          } else{
            for (let i = 0; i < state.takeQuestions; i++) {
              newQuestions.push(filterByDiff[i]);
            }
          }
          return {...state,questions:newQuestions,process:true}
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
         return {...state,index:state.index+1,answer: result===undefined ? null:result.answer}
       }
       case 'back':{
        const result:answeredQuestions | undefined = state.savedAnswers.find((ans)=>ans.questionNumber===state.index)
          return{...state,index:state.index-1,answer:result===undefined ? null:result.answer}   
       }
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
 const [{status,questions,index,answer,process, points,highScore,secondsRemaining,savedAnswers,category,difficulty,totalQuestions,allQuestions,takeQuestions},dispatch]=useReducer(reducer,initialState)
//  const maxPossiblePoints = questions.reduce((pre,curr)=>pre+curr.points,0)

 useEffect(()=>{
    async function fetchData(){
     try {
      const data = await fetch('https://json-server-pied-rho.vercel.app/api/questions')
      const results = await data.json() as allQuestions []
      dispatch({type:'dataReceived',payload:results})
     }
     catch (error) {
      dispatch({type:'dataError'})
     }
    }
    fetchData()
  },[category])

  return (
    <QuizContext.Provider value={{status,answer,questions,index,points,highScore,secondsRemaining,savedAnswers, process, category,difficulty,totalQuestions,allQuestions,takeQuestions, dispatch}}>
        {children}
    </QuizContext.Provider>
  )
}

export default QuizProvider