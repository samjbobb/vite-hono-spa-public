import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './vite.svg'
import './App.css'
import { hc } from 'hono/client'
import {AppType} from "../backend/api.ts";

const client = hc<AppType>('/api')

function App() {
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState("")

    const handleNameSubmit = async () => {
        const input = document.getElementById("name-input") as HTMLInputElement
        const res    = await client.hello[":name"].$get({param: {name: input.value}})
        if (res.ok) {
            const data = await res.json()
            setMessage(data.message)
        }
    }

    const handleCreatePost = async () => {
        const res = await client.posts.$post({
            form: {
                title: 'Hello',
                body: 'Hono is a cool project',
            },
        })
        console.log(res)
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
                    Edit <code>frontend/App.tsx</code> and save to test HMR
                </p>
            </div>
            <div className={"card"}>
                <input id={"name-input"} type="text" placeholder="Type here"/>
                <p>
                    <button onClick={handleNameSubmit}>Submit</button>
                </p>
                {message && <p>{message}</p>}
            </div>
            <div className={"card"}>
                <p>
                    <button onClick={handleCreatePost}>Create Post</button>
                </p>
            </div>
        </>
    )
}

export default App
