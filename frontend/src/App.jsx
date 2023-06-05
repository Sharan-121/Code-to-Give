import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login.component'
import Home from './components/home.component'

function App() {
  const [count, setCount] = useState(0)

  return (
		<Router>
			<Routes>
				<Route exact path="/login" element={<Login/>} />
				<Route exact path="/home/*" element={<Home/>} />
				<Route path="*" element={<Login/>} />
			</Routes>
		</Router>
  	);
}

export default App
