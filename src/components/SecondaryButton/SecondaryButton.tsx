import style from "./SecondaryButton.module.css";

interface Props {
	text?: string;
	onClick?: any;
	icon?: React.ReactNode;
	fitWidth?: boolean;
	disabled?: boolean;
}

export const SecondaryButton = ({ text, onClick, icon, fitWidth, disabled }: Props) => {
	return (
		<button
			className={`${style.mainButton__container} ${fitWidth && style.mainButton__fitWidth}`}
			onClick={onClick}
			disabled={disabled}
		>
			{text && text} {icon && icon}
		</button>
	);
};
