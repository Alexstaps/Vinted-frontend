import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Offer = (token) => {
	// const params = useParams();
	// console.log(params);
	// useParams permet de récupérer les params présent dans l'url de la page

	const { id } = useParams();
	//   console.log(id);
	//   console.log(params.id);

	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	// console.log(data);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
				);
				// console.log("là =>", response.data);

				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				// console.log(error.response.data);
			}
		};
		fetchData();
	}, [id]);

	return isLoading ? (
		<p>Is loading...</p>
	) : (
		<section className="main-offer">
			<div className="offer container">
				<div>
					<img src={data.product_image.secure_url} alt="" />
				</div>

				<div className="details">
					<p className="price">{data.product_price} €</p>
					{data.product_details.map((detail) => {
						// console.log(detail);
						const clefs = Object.keys(detail);
						// console.log(clefs);
						const clef = clefs[0];
						// console.log(clef);
						return (
							<div key={clef}>
								<div className="product-details">
									<span className="color-lightgrey">{clef}</span>
									<span className="color-opaque">{detail[clef]}</span>
								</div>
							</div>
						);
					})}
					<div className="separator"></div>

					<div>
						<p className="bold">{data.product_name}</p>
						<p className="color-lightgrey">{data.product_description}</p>
						<div>
							{data.owner.account.avatar && (
								<img
									className="avatar-offer"
									src={data.owner.account.avatar.secure_url}
									alt=""
								/>
							)}
							<span className="padding-bottom">
								{data.owner.account.username}
							</span>
						</div>

						{/* {console.log("ici=>", data.product_price)} */}

						<Link
							to="/payment"
							state={{ name: data.product_name, price: data.product_price }}
						>
							<button className="plein-offer">Acheter</button>
						</Link>
					</div>

					<p></p>
				</div>
			</div>
		</section>
	);
};

export default Offer;
