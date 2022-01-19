import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import Order from "./Order";
import { useStateValue } from "../StateProvider";
import '../styles/Orders.css'

function Orders() {
	const [{ user }] = useStateValue();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user) {
			const queryDoc = async () => {
				const ordersQuery = query(
					collection(db, `users/${user?.uid}/orders`),
					orderBy("created", "desc")
				);

				const querySnapshot = await getDocs(ordersQuery);
				querySnapshot.forEach((snap) => {
					let { amount, basket, created } = snap.data();
					let obj = {
						id: snap.id,
						amount: amount,
						basket: basket,
						created: created
					}
					setOrders(prevState => [...prevState, obj])
					// setOrders((prevState) => [...prevState, snap.data()])
				});
			};
			queryDoc();
		} else {
			setOrders([]);
		}
	}, [user]);

	return (
		<div className="orders">
			<h1>Your Orders</h1>
			<div>
				{orders?.map((order, index) => (
					<div key={index}>
						<Order order={order} />
					</div>
				))}
			</div>
		</div>
	);
}

export default Orders;
