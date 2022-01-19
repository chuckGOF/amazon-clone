import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BasketItem from "./BasketItem";
import "../styles/Payment.css";
import { useStateValue } from "../StateProvider";
import CurrencyFormat from "react-currency-format";
// setting up stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from "../reducer";
import instance from "../axios";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function Payment() {
	// our stateprovider
	const [{ basket, user }, dispatch] = useStateValue();
	const navigate = useNavigate();

	// our states to handle payment
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [processing, setProcessing] = useState(false);
	const [succeeded, setSucceeded] = useState("");
	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		// generate teh special stripe secret which allows us to charge  custoemr
		const getClientSecret = async () => {
			if (getBasketTotal(basket) > 0) {
				const response = await instance({
					method: "post",
					// stripe expects the total in a currencies subunits
					url: `/payments/create?total=${
						getBasketTotal(basket) * 100
					}`,
				});
				setClientSecret(response.data.clientSecret);
			}
		};
		getClientSecret();
	}, [basket]);

	console.log("THE SECRET IS >>>>, ", clientSecret);

	const stripe = useStripe();
	const elements = useElements();

	const handleChange = (e) => {
		// listen for changes in the CardElement
		// and display any erroes as the customer types their card details
		setDisabled(e.empty);
		setError(e.error ? e.error.message : "");
	};

	const handleSubmit = async (e) => {
		// handle stripe
		e.preventDefault();
		setProcessing(true);
		// eslint-disable-next-line no-unused-vars
		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(async ({ paymentIntent }) => {

				console.log(paymentIntent)
				// paymentIntent = payment confirmation
				const orderDetail = {
					basket: basket,
					amount: paymentIntent.amount / 100,
					created: paymentIntent.created,
				};

				// push order details to firestore
				const orderRef = doc(
					db,
					`users/${user?.uid}/orders/${paymentIntent.id}`
				);
				// eslint-disable-next-line no-unused-vars
				const order = await setDoc(orderRef, orderDetail);

				setSucceeded(true);
				setError(null);
				setProcessing(false);

				dispatch({
					type: "EMPTY_BASKET",
				});

				navigate("/orders");
			});
	};

	return (
		<div className="payment">
			<div className="payment__container">
				<h1>
					Checkout (<Link to="/checkout">{basket?.length} items</Link>
					)
				</h1>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Delivery Address</h3>
					</div>
					<div className="payment__address">
						<p>
							<strong>{user?.name}</strong>
						</p>
						<p>7 Yellow Clay Manor</p>
						<p>Commons Road, Navan</p>
						<p>County Meath</p>
					</div>
				</div>

				<div className="payment__section">
					<div className="payment__title">
						<h3>Review item and delivery</h3>
					</div>
					<div className="payment__items">
						{basket.map((item, index) => (
							<BasketItem
								key={index}
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))}
					</div>
				</div>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>
					<div className="payment__details">
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className="payment__priceContainer">
								<CurrencyFormat
									renderText={(value) => (
										<>
											<h3>Order Total: {value}</h3>
										</>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"£"}
								/>
								{user && <button
									disabled={
										processing || disabled || succeeded
									}
								>
									<span>
										{processing ? (
											<p>Processing</p>
										) : (
											"Buy Now"
										)}
									</span>
								</button>}
							</div>
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
