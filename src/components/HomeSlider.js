import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/HomeSlider.css";

function HomeSlider() {
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
	};

	return (
		<Slider {...settings}>
			<div>
				<img
					className="homeSlider__banner"
					src="https://m.media-amazon.com/images/I/61ZZIsRoRbL._SX3000_.jpg"
					alt=""
				/>
			</div>
			<div>
				<img
					className="homeSlider__banner"
					src="https://m.media-amazon.com/images/I/71GjwC3Xq+L._SX3000_.jpg"
					alt=""
				/>
			</div>
		</Slider>
	);
}

export default HomeSlider;
