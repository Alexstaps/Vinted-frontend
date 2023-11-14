import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// pages

import Home from "./assets/pages/Home";
import Offer from "./assets/pages/Offer";
import SignUp from "./assets/pages/signUp";
import Login from "./assets/pages/Login";
import Publish from "./assets/pages/Publish";
import Payment from "./assets/pages/payment";
// components

// import CheckOutForm from "./components/CheckOutForm";
import Header from "./components/Header";

function App() {
	const [id, setId] = useState(Cookies.get("id") || null);

	const handleId = (id) => {
		if (id) {
			Cookies.set("id", id, { expires: 15 });
			setId(id);
		} else {
			Cookies.set("id", id, { expires: 15 });
		}
	};
	// State dans lequel je stocke le token. Sa valeur de base sera :
	// - Si je trouve un cookie token, ce cookie
	// - Sinon, null
	const [token, setToken] = useState(
		Cookies.get("token") || null // recherche si dans les cookies il y a un token, s'il n'est pas présent le définir à null
		// Cookies.get("token") ? Cookies.get("token") : null
	);

	const [search, setSearch] = useState("");
	const [prices, setPrices] = useState([0, 50]);

	const handleToken = (token) => {
		if (token) {
			Cookies.set("token", token, { expires: 15 });
			setToken(token);
		} else {
			Cookies.remove("token");
			setToken(null);
		}
	};

	return (
		<>
			<Router>
				<Header
					token={token}
					search={search}
					setSearch={setSearch}
					handleToken={handleToken}
					prices={prices}
					setPrices={setPrices}
				/>
				{/* envoie des props aux header */}
				<Routes>
					<Route path="/" element={<Home search={search} token={token} />} />
					<Route path="/offer/:id" element={<Offer token={token} />} />
					<Route path="/login" element={<Login handleToken={handleToken} />} />
					<Route
						path="/signup"
						element={<SignUp handleToken={handleToken} handleId={handleId} />}
					/>
					<Route path="/publish" element={<Publish token={token} />} />
					<Route
						path="/payment"
						element={<Payment token={token} handleId={handleId} id={id} />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
