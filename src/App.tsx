import { useEffect, useReducer } from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import Loader from "./components/Loader"
import ErrorComponent from "./components/Error"
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"

// Types definitions
export type question ={
  question:string,
  options: string [],
  correctOption:number,
  points:number
}

type questionsState ={
  questions:question []
  status:'loading' | 'error' | 'ready' | 'active' | 'finished'
  index:number,
  answer:number | null
  points:number
}

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

export type Action= fetchData | fetchError | displayQuestions | markedAnswer


const initialState:questionsState={
  questions:[],
  status:'loading',
  index:0,
  answer:null,
  points:0
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
          return {...state,status:'active'}  
        case 'newAnswer':{
          const currentQuestion:question = state.questions[state.index]
          
          return {...state,answer:action.payload,points:action.payload===currentQuestion.correctOption ? state.points+currentQuestion.points:state.points,} 
        }
        default:
          throw new Error("Known action")
     }
 } 

function App() {
  const [{status,questions,index,answer},dispatch]=useReducer(reducer,initialState)

  const numQuestions= questions.length
  
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
    <div className="app">
     <Header/>
     <Main>
       {status==='loading' && <Loader/>}
       {status==='error' && <ErrorComponent/>}
       {status==='ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
       {status==='active' && <Question loadQuestion={questions[index]} dispatch={dispatch} answer={answer} />}
     </Main>
    </div>
  )
}

export default App
