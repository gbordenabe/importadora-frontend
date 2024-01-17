import style from "./PrimaryButton.module.css";

interface Props {
	text?: string;
	onClick?: any;
	icon?: React.ReactNode;
	fitWidth?: boolean;
}

export const PrimaryButton = ({ text, onClick, icon, fitWidth }: Props) => {
	return (
		<button
			className={`${style.mainButton__container} ${fitWidth && style.mainButton__fitWidth}`}
			onClick={onClick}
		>
			{text && text} {icon && icon}
		</button>
	);
};
