import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login.component'
import FormComponent from './components/form.component'

function App() {
  const [count, setCount] = useState(0)

  return (
		<Router>
			<div class="container">
				<Routes>
					<Route exact path="/" element={<Login/>} />
					<Route exact path="/form" element={<FormComponent/>} />
					<Route path="*" element={<Login/>} />
				</Routes>
			</div>
		</Router>
  	);
}

export default App
