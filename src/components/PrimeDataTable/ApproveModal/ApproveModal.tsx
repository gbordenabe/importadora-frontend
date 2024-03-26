import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import style from "./ApproveModal.module.css";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";

interface Props {
	onHideModal?: any;
	onApprove?: any;
	rowData?: any;
}

export const ApproveModal = ({ onHideModal, onApprove, rowData }: Props) => {
	const approveDocument = () => {
		onApprove?.(rowData);
		onHideModal();
	};

	return (
		<div className={style.column__container}>
			<p style={{ textAlign: "center" }}>
				Estas por aprobar y ya no podrás editar ni solicitar cambios <b>¿deseas continuar?</b>
			</p>

			<div className={style.button__container}>
				<PrimaryButton text="Si, aprobar" onClick={approveDocument} />
				<SecondaryButton text="No, volver" onClick={onHideModal} />
			</div>
		</div>
	);
};
