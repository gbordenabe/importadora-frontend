import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi.js";
import { useAppDispatch } from "@/store/hooks";
import { setToast } from "@/store/slices/toast";

export const useUpdateFetch = (
	endPoint: string,
	sectionName: string,
	reloadFetchData?: () => void,
	addModal?: any
) => {
	const dispatch = useAppDispatch();
	const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
	const [errorUpdate, setErrorUpdate] = useState<any>(null);
	const [successUpdate, setSuccessUpdate] = useState<boolean>(false);

	const setInitStateUpdate = () => {
		setIsLoadingUpdate(false);
		setErrorUpdate(null);
		setSuccessUpdate(false);
	};

	useEffect(() => {
		if (successUpdate) {
			dispatch(
				setToast({
					severity: "success",
					summary: `${sectionName} Actualizado`,
					detail: `${sectionName} ha sido actualizado exitosamente`,
				})
			);

			if (addModal) {
				addModal.onHideModal();
			}
			setInitStateUpdate();
			if (reloadFetchData) {
				reloadFetchData();
			}
		}
	}, [successUpdate]);

	const updateFetchData = async (id: string, data: any): Promise<any> => {
		try {
			setIsLoadingUpdate(true);

			const token = localStorage.getItem("rt__grifosBackoffice"); // Obteniendo el token JWT del localStorage
			const headers = {
				Authorization: `Bearer ${token}`,
			};

			await axios.patch(`${url}${endPoint}/${id}`, data, {
				headers,
			});

			setIsLoadingUpdate(false);
			setSuccessUpdate(true);
		} catch (error) {
			setIsLoadingUpdate(false);
			setErrorUpdate(error);
		}
	};

	return {
		updateFetchData,
		isLoadingUpdate,
	};
};
