import style from "./ValidationModal.module.css";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";

interface Props {
	onHideModal?: any;
	description?: string;
}

export const ValidationModal = ({ onHideModal, description }: Props) => {
	return (
		<div className={style.validationModal__container}>
			<p className={style.validationModal__description}>{description}</p>
			<div>
				<SecondaryButton text="Volver" onClick={onHideModal} />
			</div>
		</div>
	);
};
