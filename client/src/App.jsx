import { useState } from 'react'
import Navigation from './components/Navigation'
import Form from './components/Form'


function App() {
 const [Clear, setClear] = useState(false)

const clearItems = ()=>{
  setClear(true)
}

const unclearItems = ()=>{
  setClear(false)
}
  return (
    <>
      <div className="App">
        <Navigation clearItems={clearItems}/>
        <Form unclearItems={unclearItems} clear={Clear} />
      </div>
    </>
  )
}

export default App
