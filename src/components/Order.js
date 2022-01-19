import React from "react";
import "../styles/Order.css";
import moment from "moment";
import BasketItem from "./BasketItem";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
	return (
		<div className="order">
			<h2>Order</h2>
			<p>{moment.unix(order.created).format("MMMM Do YYYY, h:mma")}</p>
			<p className="order__id">
				<small>{order.id}</small>
			</p>
			{order.basket?.map((item, index) => (
				<BasketItem
					key={index}
					id={item.id}
					image={item.image}
					price={item.price}
					rating={item.rating}
                    title={item.title}
                    hideButton
				/>
			))}
			<CurrencyFormat
				renderText={(value) => (
                    <h3 className="order__total">Order Total : {value}</h3>
				)}
				decimalScale={2}
				value={order.amount}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"£"}
			/>
		</div>
	);
}

export default Order;
