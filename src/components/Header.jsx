import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Range } from "react-range";

const Header = ({
	token,
	handleToken,
	search,
	setSearch,
	prices,
	setPrices,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	// const changePrice = (event) => {
	// 	setPrices(event.target.value);
	// };

	// console.log(location);

	return (
		<header>
			<div className="align-header container">
				<Link to="/">
					<img
						src="https://lereacteur-vinted.netlify.app/static/media/logo.10b0caad793dd0a8ea72.png"
						alt="logo Vinted"
					/>
				</Link>
				<div className="col-input">
					<input
						type="text"
						placeholder="Recherche des articles"
						value={search}
						onChange={(event) => {
							console.log("event=>", event);
							setSearch(event.target.value);
						}}
						className="research"
					/>
					{location.pathname === "/" && <input type="text" />}
				</div>

				<div className="login">
					{token ? (
						<button
							onClick={() => {
								// Je me déconnecte en appelant la fonction handleToken et en lui donnant null en argument
								handleToken(null);
							}}
							className="deconnexion"
						>
							Se deconnecter
						</button>
					) : (
						<>
							<button
								onClick={() => navigate("/signup")}
								className="transparant"
							>
								S'inscrire
							</button>
							<button
								className="transparant"
								onClick={() => navigate("/login")}
							>
								Se connecter
							</button>
						</>
					)}
				</div>
				<button
					onClick={() => {
						token ? navigate("/publish") : navigate("/login");
					}}
					className="plein"
				>
					Vends tes articles
				</button>
			</div>
		</header>
	);
};
export default Header;
