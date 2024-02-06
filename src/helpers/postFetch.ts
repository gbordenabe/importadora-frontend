import axios from "axios";
import { url } from "@/connections/mainApi";

export let postFetch = async (path: string, payload: any) => {
	try {
		const token = localStorage.getItem("rt__grifosBackoffice"); // Obteniendo el token JWT del localStorage
		const headers = {
			Authorization: `Bearer ${token}`,
		};

		console.log(payload);
		// await axios.post(`${url}${path}`, { headers }, payload);
	} catch (error) {
		console.error(error);
	}
};
