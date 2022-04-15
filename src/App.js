import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./Pages/Header";
import Footer from "./Pages/Footer";
import Home from "./Pages/Home";
import Test from "./Test";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Test />} />
				<Route exact path="/registration" element={<Footer />} />
			</Routes>
		</Router>
	);
}
export default App;
