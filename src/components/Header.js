import React from "react";
import "../styles/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Header() {
	const [{ basket, user }] = useStateValue();

	const handleAuthentication = () => {
		signOut(auth)
			.then(() => {
				console.log("successful sign out");
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div className="header">
			<Link to="/">
				<img
					className="header__logo"
					src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
					alt=""
				/>
			</Link>

			<div className="header__search">
				<input className="header__searchInput" type="text" />
				<SearchIcon className="header__searchIcon" />
			</div>

			<div className="header__nav">
				<Link to={!user && "/login"} className="header__link">
					<div
						onClick={handleAuthentication}
						className="header__option"
					>
						<span className="header__optionLineOne">
							Hello {!user ? "Guest" : user.name}
						</span>
						<span className="header__optionLineTwo">
							{!user ? "Sign in" : "Sign out"}
						</span>
					</div>
				</Link>

				<Link to="/orders" className="header__link">
					<div className="header__option">
						<span className="header__optionLineOne">Return</span>
						<span className="header__optionLineTwo">& Orders</span>
					</div>
				</Link>

				<div className="header__option">
					<span className="header__optionLineOne">Your</span>
					<span className="header__optionLineTwo">Prime</span>
				</div>

				<Link to="/checkout" className="header__link">
					<div className="header__optionBasket">
						<ShoppingBasketIcon />
						<span className="header__optionLineTwo header__optionCount">
							{basket?.length}
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Header;
