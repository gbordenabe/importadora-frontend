import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { url } from "@/connections/mainApi.js";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setToast } from "@/store/slices/toast";

interface PostDataResponse {
	data: any;
}

export const usePostFetch = (
	endPoint: string,
	sectionName: string,
	reloadFetchData?: () => void,
	addModal?: any
) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
	const [errorPost, setErrorPost] = useState<any>(null);
	const [successPost, setSuccessPost] = useState<boolean>(false);

	const setInitStatePost = () => {
		setIsLoadingPost(false);
		setErrorPost(null);
		setSuccessPost(false);
	};

	useEffect(() => {
		if (successPost) {
			dispatch(
				setToast({
					severity: "success",
					summary: `${sectionName} Agregado`,
					detail: `${sectionName} ha sido agregado exitosamente`,
				})
			);

			if (addModal) {
				addModal.onHideModal();
			}
			setInitStatePost(); //Seteo los errores y el succes a su estado inicial
			if (reloadFetchData) {
				reloadFetchData(); //Vuelvo hacer el llamado de la data
			}
		}
	}, [successPost]);

	const postFetchData = async (data: any, query?: string, pathUrl?: string): Promise<any> => {
		try {
			setIsLoadingPost(true);

			const token = localStorage.getItem("rt__grifosBackoffice");
			const headers = {
				Authorization: `Bearer ${token}`,
			};

			const resp: AxiosResponse<PostDataResponse> = await axios.post(
				`${url}${endPoint}${query ? `?${query}` : ""}`,
				data,
				{
					headers,
				}
			);

			setIsLoadingPost(false);
			setSuccessPost(true);

			if (pathUrl) {
				setTimeout(() => {
					navigate(pathUrl);
				}, 500);
			}

			return resp.data.data;
		} catch (error) {
			setIsLoadingPost(false);
			setErrorPost(error);
		}
	};

	return {
		postFetchData,
		isLoadingPost,
	};
};
