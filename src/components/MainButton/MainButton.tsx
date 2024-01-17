import style from "./MainButton.module.css";

interface Props {
	text?: string;
	onClick?: any;
}

export const MainButton = ({ text, onClick }: Props) => {
	return (
		<button className={style.mainButton__container} onClick={onClick}>
			{text}
		</button>
	);
};
