import { useState } from "react";

export const useModal = () => {
	const [modalStatus, setModalStatus] = useState(false);

	const onVisibleModal = () => {
		setModalStatus(true);
	};

	const onHideModal = () => {
		setModalStatus(false);
	};

	return { modalStatus, onVisibleModal, onHideModal };
};
