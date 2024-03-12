import style from "./PrimaryButton.module.css";

interface Props {
	text?: string;
	onClick?: any;
	icon?: React.ReactNode;
	fitWidth?: boolean;
	type?: any
}

export const PrimaryButton = ({ text, onClick, icon, fitWidth, type }: Props) => {
	return (
		<button
			className={`${style.mainButton__container} ${fitWidth && style.mainButton__fitWidth}`}
			onClick={onClick}
			type= {type}
		>
			{text && text} {icon && icon}
		</button>
	);
};
