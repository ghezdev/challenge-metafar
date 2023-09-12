import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <p>{count}</p>
    </>
  )
}

export default App
