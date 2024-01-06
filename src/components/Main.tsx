import { type ReactNode } from "react"

type mainProps ={
  children:ReactNode
}

function Main({children}:mainProps) {
  return (
    <main className="main">
        {children}
    </main>
  )
}

export default Main