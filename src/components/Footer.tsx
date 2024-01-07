import { type ReactNode } from "react"

type footerProps={
    children:ReactNode
}

function Footer({children}:footerProps) {
  return (
    <footer>
      {children}
    </footer>
  )
}

export default Footer