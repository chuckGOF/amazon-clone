import React, { useEffect } from "react";
import "./styles/App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./StateProvider";

// modules for including stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
	"pk_test_51KGsWvHClDptJtFWrDrT3hiBhHKvEDx6jvl8xSGC3vLZhzOPsmnbo8J3tx5mSd6vq7wzfQ22lULlvz5sd1PkvQCh003GjUsrWN"
);

function App() {
	// eslint-disable-next-line no-empty-pattern
	const [{}, dispatch] = useStateValue();

	useEffect(() => {
		// will only run once when the app component loads....
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email } = user;
				const username = email.split("@")[0];
				const userDetail = {
					uid: uid,
					name: username,
				};
				dispatch({
					type: "SET_USER",
					user: userDetail,
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<BrowserRouter>
			<div className="app">
				<Routes>
					<Route
						path="/"
						element={
							<div>
								<Header />
								<Home />
							</div>
						}
					/>
					<Route
						path="checkout"
						element={
							<div>
								<Header />
								<Checkout />
							</div>
						}
					/>
					<Route path="login" element={<Login />} />
					<Route
						path="payment"
						element={
							<div>
								<Header />
								<Elements stripe={promise}>
									<Payment />
								</Elements>
							</div>
						}
					/>
					<Route
						path="orders"
						element={
							<div>
								<Header />
								<Orders />
							</div>
						}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
