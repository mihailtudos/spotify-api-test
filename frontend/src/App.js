import './App.css';
import Home from './pages/Home';
import Albums from './pages/Albums.js';
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from "axios";



function App() {

	useEffect( () => {
		axios
			.get("http://localhost:3001/login")
			.then(response => {
				//hide or show the button
			});
	});
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Home/>}/>
				<Route exact path="/albums" element={<Albums/>}/>
				<Route path="*" element={<Home/>}/>
			</Routes>
		</Router>
	);
}

export default App;
