import { useEffect, useReducer } from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import Loader from "./components/Loader"
import ErrorComponent from "./components/Error"
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"

// Types definitions
export type questions ={
  question:string,
  options: string [],
  correctOption:number,
  points:number
}

type questionsState ={
  questions:questions []
  status:'loading' | 'error' | 'ready' | 'active' | 'finished'
  index:number
}

type fetchData ={
  type:'dataReceived',
  payload:questions []
}

type fetchError={
  type:'dataError'
}

type displayQuestions={
  type:'start'
}

export type Action= fetchData | fetchError | displayQuestions


const initialState:questionsState={
  questions:[],
  status:'loading',
  index:0
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
        default:
          throw new Error("Known action")
     }
 } 

function App() {
  const [{status,questions,index},dispatch]=useReducer(reducer,initialState)

  const numQuestions= questions.length
  
  useEffect(()=>{
    async function fetchData(){
     try {
      const data = await fetch('http://localhost:9000/questions')
      const results = await data.json() as questions []
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
       {status==='active' && <Question loadQuestion={questions[index]} />}
     </Main>
    </div>
  )
}

export default App
