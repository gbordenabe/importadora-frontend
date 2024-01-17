import style from "./AddButton.module.css";

interface Props {
	text?: string;
	onClick: () => void;
}

export const AddButton = ({ text, onClick }: Props) => {
	return (
		<div className={style.addButton__container} onClick={onClick}>
			<p className={style.addButton__text}>{text}</p>
		</div>
	);
};
