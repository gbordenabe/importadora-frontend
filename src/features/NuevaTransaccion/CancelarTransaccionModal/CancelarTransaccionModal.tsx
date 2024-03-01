import { useNavigate } from "react-router-dom";
import style from "./CancelarTransaccionModal.module.css";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";

interface Props {
	onHideModal?: any;
	description?: string;
}

export const CancelarTransaccionModal = ({ onHideModal }: Props) => {
	const navigate = useNavigate();
	return (
		<div className={style.validationModal__container}>
			<div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "5px" }}>
				<p className={style.validationModal__description}>¿Seguro que quieres volver atrás?</p>
				<p className={style.validationModal__description}>Esto borrara todos tus datos.</p>
			</div>
			<div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "10px" }}>
				<SecondaryButton text="No, volver a donde estaba" onClick={onHideModal} />
				<SecondaryButton text="Si, Volver" onClick={() => navigate("/")} />
			</div>
		</div>
	);
};
