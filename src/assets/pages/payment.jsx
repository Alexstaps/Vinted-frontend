import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../../components/CheckOutForm";

const stripePromise = loadStripe(
	"pk_test_51OCOYIGOLP9dBdXlB8xCWBfekf7Bf2PGViXexeDamGIbZCwRatJd1gIdR3XDrZZpWho2dabG6KXU4qiVjUmNctxC00zDHKVsir"
);

const Payment = ({ token, id }) => {
	const location = useLocation();
	const { name, price } = location.state;

	console.log(price);
	return token ? (
		<main className="main-checkout">
			<div className="payment">
				<h2 className="title-checkout">Résumé de la commande</h2>
				<div className="payment-between">
					<div className="payment-column">
						<p>commande</p>
						<p>frais de proptection acheteurs</p>
						<p>frais de port</p>
					</div>
					<div className="payment-column">
						<p>{price} €</p>
						<p> 0.50 €</p>
						<p> 1.20 €</p>
					</div>
				</div>
				<div className="total">
					<div>
						<p>Total</p>
					</div>
					<div>
						<p>{price + 0.5 + 1.2} €</p>
					</div>
				</div>
				<div>
					<Elements stripe={stripePromise}>
						<CheckOutForm id={id} name={name} price={price} />
					</Elements>
				</div>
			</div>
		</main>
	) : (
		<Navigate to="/login" />
	);
};

export default Payment;
