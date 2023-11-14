import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = ({ handleToken, handleId }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newsletter, setNewsletter] = useState(false);

	//   State qui gère le message d'erreur
	const [errorMessage, setErrorMessage] = useState("");

	//   Permet de naviguer au click après avoir exécuté du code
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setErrorMessage(""); //je fais disparaitre un message d'erreur qui serait apparu auparavant sur un premier envoie de données

			console.log(email, username, password, newsletter); //permet de voir les body envoyé
			const response = await axios.post(
				"https://lereacteur-vinted-api.herokuapp.com/user/signup",
				{
					email,
					username,
					password,
					newsletter,
				}
			);

			// Mettre en cookies l'id de l'utilisateur pour permettre de l'utiliser lors du paiement

			// Cookies.set("_id", id, {expires: 15});
			handleId(response.data._id);
			// Cookies.set("token", token, { expires: 15 }); remplacé par la fonction handletoken qui vérifiera si le token est déjà présent dans les cookies et qui l'enregistrera ou supprimera
			// console.log(response.data);
			// const token = response.data.token;
			handleToken(response.data.token);
			navigate("/"); // navigue vers la page d'accueil après l'enregistrement
		} catch (error) {
			//   console.log(error.response.status); // Pour voir le message d'erreur transmis par le serveur
			// Si je reçois le message "This email already has an account"
			if (error.response.data.message === "Missing parameters") {
				// Je met à jour mon state errorMessage
				setErrorMessage("Please fill in all fields");
			} else if (error.response.status === 409) {
				setErrorMessage("This email has an account, please use another one");
			}
		}
	};

	return (
		<>
			<h2 className="center">S'inscrire</h2>
			<div>
				<form className="center">
					<input
						onChange={(event) => {
							setUsername(event.target.value);
						}}
						type="text"
						name="username"
						value={username}
						placeholder="Nom d'utilisateur"
						className="input-signup"
					/>
					<input
						onChange={(event) => {
							setEmail(event.target.value);
						}}
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						className="input-signup"
					/>
					<input
						onChange={(event) => {
							setPassword(event.target.value);
						}}
						type="password"
						name="password"
						value={password}
						placeholder="password"
						className="input-signup"
					/>
					<div className="news">
						<input
							onChange={(event) => {
								setNewsletter(event.target.value);
							}}
							type="checkbox"
							name="newsletter"
							id="newsletter"
							value={newsletter}
							className="newsletter"
						/>
						<span>S'inscrire à notre newsletter</span>
					</div>
					<p className="paragraph">
						En m'inscrivant je confirme avoir lu et accepté les Termes &
						Conditions et Politique de Confidentialité de Vinted. Je confirme
						avoir au moins 18 ans.
					</p>
					<button onClick={handleSubmit} className="button-signup">
						S'inscrire
					</button>
					{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
					<Link to="/login" className="paragraph-blue">
						Tu as déjà un compte ? Connecte-toi !
					</Link>
				</form>
			</div>
		</>
	);
};
export default SignUp;
