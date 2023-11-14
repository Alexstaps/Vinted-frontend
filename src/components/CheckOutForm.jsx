import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ id, name, price }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [succeeded, setSucceeded] = useState(false);

	// Va nous permettre de faire une requête à Stripe pour lui envoyer les codes
	const stripe = useStripe();

	//   Pour récupérer le contenu de CardElement
	const elements = useElements();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setIsLoading(true);
			// Je récupère le contenu de l'input
			const cardElement = elements.getElement(CardElement);

			//   J'envoie ces informations à stripe pour qu'il valide l'existence de la carte
			const stripeResponse = await stripe.createToken(cardElement, {
				name: id, // J'envoie un identifiant de celui qui paye pour savoir qui est à l'origine de la transaction
			});

			const stripeToken = stripeResponse.token.id;

			//   Je fais une requête à mon back et je lui envoie mon stripeToken
			console.log(stripeResponse);
			const response = await axios.post("http://localhost:3000/payment", {
				stripeToken: stripeToken,
			});
			console.log(response.data);
			//   Si la réponse contient succeeded, je fais apparaitre "payment validé"
			if (response.data.status === "succeeded") {
				setSucceeded(true);
			} else {
				setIsLoading(false);
			}

			//   console.log(stripeToken);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<p className="form-pay">
				Il ne vous reste plus qu'une étape pour vous offrir{" "}
				<span className="bold">{name}</span>. Vous allez payer{" "}
				<span className="bold">{price + 0.5 + 1.2} €</span> (frais de protection
				et frais de port inclus)
			</p>
			<CardElement className="card-elem" />

			{succeeded ? (
				<p>Paiement validé</p>
			) : (
				<input
					type="submit"
					value="Pay"
					disabled={isLoading}
					className="button-pay"
				/>
			)}
		</form>
	);
};

export default CheckoutForm;
