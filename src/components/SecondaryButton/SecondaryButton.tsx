import style from "./SecondaryButton.module.css";

interface Props {
	text?: string;
	onClick?: any;
	icon?: React.ReactNode;
	fitWidth?: boolean;
	disabled?: boolean;
	type?: any
}

export const SecondaryButton = ({ text, onClick, icon, fitWidth, disabled, type }: Props) => {
	return (
		<button
			className={`${style.mainButton__container} ${fitWidth && style.mainButton__fitWidth} ${disabled && style.disabledButton}`}
			onClick={onClick}
			disabled={disabled}
			type={type}
		>
			{text && text} {icon && icon}
		</button>
	);
};
