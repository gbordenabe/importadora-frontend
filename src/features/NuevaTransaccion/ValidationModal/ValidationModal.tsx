import style from "./ValidationModal.module.css";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";

interface Props {
	onHideModal?: any;
	description?: string;
	textButton?: string;
}

export const ValidationModal = ({ onHideModal, description, textButton }: Props) => {
	return (
		<div className={style.validationModal__container}>
			<p className={style.validationModal__description}>{description}</p>
			<div>
				<SecondaryButton text={textButton} onClick={onHideModal} />
			</div>
		</div>
	);
};
