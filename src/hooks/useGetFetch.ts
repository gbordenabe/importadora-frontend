import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi.js";

type HookData<T> = {
	data: T[] | any;
	isLoading: boolean;
	reloadFetchData: () => Promise<void>;
};

export const useGetFetch = <T>(endPoint: string): HookData<T> => {
	const [data, setData] = useState<T[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const getFetchData = async () => {
		try {
			const token = localStorage.getItem("rt__grifosBackoffice"); // Obteniendo el token JWT del localStorage
			const headers = {
				Authorization: `Bearer ${token}`,
			};

			const resp = await axios.get(`${url}${endPoint}`, { headers });
			const responseData = resp.data;

			setData(responseData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	const reloadFetchData = async () => {
		await getFetchData();
	};

	useEffect(() => {
		getFetchData();
	}, []);

	return {
		data,
		isLoading,
		reloadFetchData,
	};
};
