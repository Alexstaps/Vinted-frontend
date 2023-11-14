import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = ({ search, token }) => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	// console.log(data);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
				);
				// console.log("data =>", response.data);
				// console.log(response.data.offers.owner.account.avatar.secure_url);

				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [search]);

	return isLoading ? (
		<p>Loading ...</p>
	) : (
		<main>
			<div className="image">
				<img
					src="https://lereacteur-vinted.netlify.app/static/media/tear.884480420945b3afd77b44a6c5f98567.svg"
					alt=""
					className="absolute"
				/>
				<div className="inside ">
					<p>Prêts à faire du tri dans vos placards ?</p>
					<button
						onClick={() => {
							// console.log("ici=>", token);
							!token ? navigate("/login") : navigate("/publish");
						}}
						className="hero-button"
					>
						Commencer à vendre
					</button>
				</div>
			</div>

			<section className="container">
				<div className="wrap">
					{data.offers.map((offer) => {
						return (
							<Link to={`/offer/${offer._id}`} key={offer._id}>
								<div className="cards">
									<p>
										<span>
											{offer.owner.account.avatar && (
												<img
													src={offer.owner.account.avatar.secure_url}
													alt=""
													className="avatar"
												/>
											)}
										</span>
										{offer.owner.account.username}
									</p>
									<img src={offer.product_image.secure_url} alt="" />
									<p>{offer.product_price.toFixed(2)} €</p>
									<p>{offer.product_details[1].TAILLE}</p>
									<p>{offer.product_details[0].MARQUE}</p>
								</div>
							</Link>
						);
					})}
				</div>
			</section>
		</main>
	);
};

export default Home;
