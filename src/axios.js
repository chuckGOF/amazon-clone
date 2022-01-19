import axios from "axios";

const instance = axios.create({
	baseURL: "https://us-central1-clone-30348.cloudfunctions.net/api",
	// "http://localhost:5001/clone-30348/us-central1/api", // THE API (cloud functioin) URL
});

export default instance;
