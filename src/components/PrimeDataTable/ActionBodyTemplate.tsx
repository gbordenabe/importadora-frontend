import { useState, useEffect } from "react";
import style from "./PrimeDataTable.module.css";

import { FaCheck } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineInfo } from "react-icons/ai";
import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { ApproveModal } from "./ApproveModal/ApproveModal";

interface Props {
	rowData?: any;
	onEdit?: any;
	onRequestChange?: any;
	onApprove?: any;
	login?: any;
}

export const ActionBodyTemplate = ({
	rowData,
	onEdit,
	onRequestChange,
	onApprove,
	login,
}: Props) => {
	const { modalStatus, onHideModal, onVisibleModal } = useModal();

	const [statusButton, setStatusButton] = useState({
		checkButton: false,
		editButton: true,
		toChangeButton: false,
	});

	useEffect(() => {
		if (rowData?.status == "OK") {
			setStatusButton({
				checkButton: true,
				editButton: true,
				toChangeButton: true,
			});
		}
		if (rowData?.status == "TO_CHANGE") {
			setStatusButton({
				checkButton: true,
				editButton: false,
				toChangeButton: true,
			});
		}
		if (rowData?.status == "EDITED") {
			setStatusButton({
				checkButton: false,
				editButton: true,
				toChangeButton: false,
			});
		}
	}, [rowData]);

	if (login?.role?.name === "SELLER") {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div
					className={`${style.button__action} ${style.button__edit} ${
						statusButton?.editButton && style.button__action__disabled
					}`}
					onClick={() => {
						if (!statusButton?.editButton) {
							onEdit?.(rowData);
						}
					}}
				>
					<FiEdit2 size={16} />
				</div>
			</div>
		);
	} else {
		return (
			<>
				<div style={{ display: "flex", gap: 15, justifyContent: "center" }}>
					<div
						className={`${style.button__action} ${style.button__check} ${
							statusButton?.checkButton && style.button__action__disabled
						}`}
						onClick={() => {
							if (!statusButton?.checkButton) {
								onVisibleModal();
								// onApprove?.(rowData);
							}
						}}
					>
						<FaCheck size={16} />
					</div>

					<div
						className={`${style.button__action} ${style.button__edit} ${
							statusButton?.editButton && style.button__action__disabled
						}`}
						onClick={() => {
							if (!statusButton?.editButton) {
								onEdit?.(rowData);
							}
						}}
					>
						<FiEdit2 size={16} />
					</div>

					<div
						className={`${style.button__action} ${style.button__tochange} ${
							statusButton?.toChangeButton === true && style.button__action__disabled
						}`}
						onClick={() => {
							if (!statusButton?.toChangeButton) {
								onRequestChange?.(rowData);
							}
						}}
					>
						<AiOutlineInfo size={22} />
					</div>
				</div>

				<PrimeModal
					header={`Aprobar registro`}
					modalStatus={modalStatus}
					onHideModal={onHideModal}
					width={450}
				>
					<ApproveModal onApprove={onApprove} rowData={rowData} onHideModal={onHideModal} />
				</PrimeModal>
			</>
		);
	}
};
