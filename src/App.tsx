import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState("")

    const handleNameSubmit = async () => {
        const input = document.getElementById("name-input") as HTMLInputElement
        const resp = await fetch(`/api/hello/${input.value}`)
        const data = await resp.json()
        setMessage(data.message)
    }

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <div className={"card"}>
                <input id={"name-input"} type="text" placeholder="Type here"/>
                <p>
                    <button onClick={handleNameSubmit}>Submit</button>
                </p>
                {message && <p>{message}</p>}
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
