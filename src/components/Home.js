import React from "react";
import "../styles/Home.css";
import Product from "./Product";

function Home() {
	return (
		<div className="home">
			<div className="home__container">
				<img
					className="home__banner"
					src="https://m.media-amazon.com/images/I/61ZZIsRoRbL._SX3000_.jpg"
					alt=""
				/>

				<div className="home__row">
					<Product
						id="1"
						title="Will: The Sunday Times Bestselling Autobiographyp"
						price={9.99}
						image="https://images-eu.ssl-images-amazon.com/images/I/51wpdBkpQfS._SY291_BO1,204,203,200_QL40_ML2_.jpg"
						rating={5}
					/>
					<Product
						id="2"
						title="The Girl With All The Gifts: The most original thriller you will read this year"
						price={23.99}
						image="https://images-eu.ssl-images-amazon.com/images/I/41dPOl-PYAL._AC_SX184_.jpg"
						rating={5}
					/>
					<Product
						id="3"
						title="The Patron Saint of Liars"
						// title="Nintendo Switch (Neon Red/Neon blue)"
						price={6.99}
						// image="https://m.media-amazon.com/images/I/71dDcOto3KL._AC_SY400_.jpg"
						image="https://m.media-amazon.com/images/I/41obAg34rNL.jpg"
						rating={5}
					/>
				</div>
				<div className="home__row">
					<Product
						id="4"
						title="Artemis: A gripping sci-fi thriller from the author of The Martian"
						price={19.99}
						image="https://m.media-amazon.com/images/I/51cekvJjpGL.jpg"
						rating={5}
					/>
					<Product
						id="5"
						title="Lily's Promise: How I Survived Auschwitz"
						price={7.99}
						image="https://m.media-amazon.com/images/I/51hPi17HCxS.jpg"
						rating={5}
					/>
					<Product
						id="6"
						title="Love is Blind"
						price={15.99}
						image="https://m.media-amazon.com/images/I/41brnExoloL.jpg"
						rating={5}
					/>
					<Product
						id="7"
						title="Stay Close: NOW A MAJOR NETFLIX SHOW"
						price={32.99}
						image="https://m.media-amazon.com/images/I/41cI6djNEVL.jpg"
						rating={5}
					/>
				</div>
				<div className="home__row">
					<Product
						id="8"
						title="Her Perfect Family"
						price={11.99}
						image="https://m.media-amazon.com/images/I/516rIJ4Yo5L.jpg"
						rating={5}
					/>
					<Product
						id="9"
						title="Liar: The Sunday Times Top 5 Bestseller"
						price={27.99}
						image="https://m.media-amazon.com/images/I/519KJkzXFgL.jpg"
						rating={5}
					/>
					<Product
						id="10"
						title="Behind The Scenes At The Museum"
						price={3.99}
						image="https://m.media-amazon.com/images/I/51XsCOygUIS.jpg"
						rating={5}
					/>
					<Product
						id="11"
						title="Sheltering Rain: the captivating and emotional novel"
						price={1.99}
						image="https://m.media-amazon.com/images/I/41T8mJZD5xL.jpg"
						rating={5}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
