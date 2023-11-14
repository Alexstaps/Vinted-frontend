import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
	const [picture, setPicture] = useState();
	const [title, setTitle] = useState("");
	const [condition, setCondition] = useState("");
	const [description, setDescription] = useState("");
	const [brand, setBrand] = useState("");
	const [price, setPrice] = useState("");
	const [size, setSize] = useState("");
	const [city, setCity] = useState("");
	const [color, setColor] = useState("");

	const userToken = token;
	console.log(userToken);
	const navigate = useNavigate();

	const handlePublish = async (event) => {
		event.preventDefault();

		try {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("description", description);
			formData.append("brand", brand);
			formData.append("size", size);
			formData.append("color", color);
			formData.append("condition", condition);
			formData.append("city", city);
			formData.append("price", price);
			formData.append("picture", picture);

			const response = await axios.post(
				"https://lereacteur-vinted-api.herokuapp.com/offer/publish",
				formData,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			navigate("/");
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return userToken ? (
		<>
			<main className="publish">
				<h2>Vends ton article</h2>
				<section>
					<div className="container">
						<form onSubmit={handlePublish}>
							<section className="container add-img">
								<label htmlFor="picture-input" className="picture-style">
									choisissez une img
								</label>
								<input
									type="file"
									onChange={(event) => {
										setPicture(event.target.files[0]);
									}}
									id="picture-input"
									className="hidden"
								/>
								{/* {picture && (
									<img
										src={URL.createObjectURL(picture)}
										alt="test"
										className="preview"
									/>
								)} */}
							</section>

							<section className="title container">
								<div className="between ">
									<label htmlFor="title" className="width">
										Titre
									</label>
									<input
										type="text"
										onChange={(event) => {
											setTitle(event.target.value);
										}}
										value={title}
										className="input-title"
									/>
								</div>
								<div className="between">
									<label htmlFor="label-description" className="width">
										Décris ton article
									</label>
									<input
										type="text"
										id="input-description"
										onChange={(event) => {
											setDescription(event.target.value);
										}}
										value={description}
										className="input-heigth"
									/>
								</div>
							</section>

							<section className="container publish-details">
								<div className="between">
									<label htmlFor="marque" className="width">
										Marque
									</label>
									<input
										type="text"
										name="brand"
										id="marque"
										onChange={(event) => {
											setBrand(event.target.value);
										}}
										value={brand}
									/>
								</div>
								<div className="between">
									<label htmlFor="size" className="width">
										Taille
									</label>
									<input
										type="text"
										name="size"
										id="size"
										onChange={(event) => {
											setSize(event.target.value);
										}}
										value={size}
									/>
								</div>
								<div className="between">
									<label htmlFor="color" className="width">
										Couleur
									</label>
									<input
										type="text"
										name="colore"
										id="color"
										onChange={(event) => {
											setColor(event.target.value);
										}}
										value={color}
									/>
								</div>
								<div className="between">
									<label htmlFor="conditions" className="width">
										Etat
									</label>
									<input
										type="text"
										name="state"
										id="conditions"
										onChange={(event) => {
											setCondition(event.target.value);
										}}
										value={condition}
									/>
								</div>
								<div className="between">
									<label htmlFor="city" className="width">
										Lieu
									</label>
									<input
										type="text"
										name="marque"
										id="city"
										onChange={(event) => {
											setCity(event.target.value);
										}}
										value={city}
									/>
								</div>
							</section>

							<section className="container">
								<div className="between col price">
									<label htmlFor="price" className="width">
										Prix
									</label>
									<div className="between ">
										<input
											type="number"
											name="price"
											id="price"
											onChange={(event) => {
												setPrice(event.target.value);
											}}
											value={price}
										/>
										<input type="checkbox" />
									</div>
								</div>
							</section>

							<button type="submit">Publier mon offre</button>
						</form>
					</div>
				</section>
			</main>
		</>
	) : (
		<Navigate to="/login" />
	);
};

export default Publish;
