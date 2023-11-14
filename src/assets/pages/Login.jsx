import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ handleToken }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				"https://lereacteur-vinted-api.herokuapp.com/user/login",
				{
					email: email,
					password: password,
				}
			);
			console.log(response.data);
			Cookies.set("token", response.data.token);
			handleToken(response.data.token);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main>
			<h2 className="center">Se connecter</h2>
			<form className="center">
				<input
					type="email"
					placeholder="email"
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
					className="input-signup"
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					className="input-signup"
				/>
				<button onClick={handleSubmit} className="button-signup">
					Se connecter
				</button>
				<Link to="/signup" className="paragraph-blue">
					Pas encore de compte ? inscris-toi !
				</Link>
			</form>
		</main>
	);
};

export default Login;
