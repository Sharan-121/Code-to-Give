import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './components/login.component'
import Home from './components/home.component'
import Staff from './components/staff/staff.component'

function App() {
  const [count, setCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("id"));

  return (
		<Router>
			<Routes>
				<Route exact path="/login" element={<Login setIsAuthenticated = {setIsAuthenticated}/>} />
				{ isAuthenticated ?
					(<Route exact path="/home/*" element={<Home setIsAuthenticated = {setIsAuthenticated} />} />):
					(<Route exact path="/home/*" element={<Login setIsAuthenticated = {setIsAuthenticated} />}  />)
				}
				{ isAuthenticated ?
					(<Route exact path="/staff/*" element={<Staff setIsAuthenticated = {setIsAuthenticated} />} />):
					(<Route exact path="/staff/*" element={<Login setIsAuthenticated = {setIsAuthenticated} />}  />)
				}
				<Route path="*" element={<Login setIsAuthenticated = {setIsAuthenticated}/>} />
			</Routes>
		</Router>
  	);
}

export default App
