import style from "./ChipText.module.css";

interface Props {
	text?: string;
}
export const ChipText = ({ text }: Props) => {
	return (
		<div className={style.text__container}>
			<p className={style.text}>{text}</p>
		</div>
	);
};
