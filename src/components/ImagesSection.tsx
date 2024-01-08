import { useState } from "react"
import Filter from "./Filter"
import { IMAGE_LIST } from "../util/constant"
import { useQuiz } from "../context/useContext"

function ImagesSection() {
  const{dispatch}= useQuiz()
  const[show,setShow] =useState(true)
   
  function handleClick(imageName:string):void{
     setShow((pre)=>!pre)
     console.log(imageName)
     const category =imageName.split('.png')[0]
     dispatch({type:'selectCategory',payload:category})
  }

  function handleChangeCategory(){
    setShow(true)
    dispatch({type:'changeCategory'})
  }
  
  return (
    <>
    {show ? <div className="image-section">
        {
          IMAGE_LIST.map((img)=>{
            return <img src={img} key={img} onClick={()=>handleClick(img)} />
          })
        }
    </div>:<Filter/>
  } 
    <div className="btn-list">
    {!show && <button className="btn" onClick={handleChangeCategory}>Change Category</button>}
    {!show && <button className="btn" onClick={()=>dispatch({type:'process'})}>Next</button>}
    </div>
    </>
  )
}

export default ImagesSection