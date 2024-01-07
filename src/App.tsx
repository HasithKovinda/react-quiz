import { useEffect, useReducer } from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import Loader from "./components/Loader"
import ErrorComponent from "./components/Error"
import StartScreen from "./components/StartScreen"

// Types definitions
type questions ={
  question:string,
  options: string [],
  correctOption:number,
  points:number
}

type questionsState ={
  question:questions []
  status:'loading' | 'error' | 'ready' | 'active' | 'finished'
}

type fetchData ={
  type:'dataReceived',
  payload:questions []
}

type fetchError={
  type:'dataError'
}

type Action= fetchData | fetchError


const initialState:questionsState={
  question:[],
  status:'loading'
}

 function reducer(state:questionsState,action:Action):questionsState{
     switch(action.type){
        case 'dataReceived':
          return {
           ...state,question:action.payload,status:'ready'
          }
        case 'dataError':
          return{
            ...state,status:'error'
          }  
        default:
          throw new Error("Known action")
     }
 } 

function App() {
  const [{status,question},dispatch]=useReducer(reducer,initialState)

  const numQuestions= question.length
  
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
       {status==='ready' && <StartScreen numQuestions={numQuestions} />}
     </Main>
    </div>
  )
}

export default App
