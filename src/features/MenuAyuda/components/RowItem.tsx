import style from "./RowItem.module.css";

interface Props {
	title?: string;
	children?: React.ReactNode;
	codeColor?: string;
}

export const RowItem = ({ title, children, codeColor }: Props) => {
	const customStyle: React.CSSProperties = {
		background: codeColor,
	};

	return (
		<div className={style.rowItem__container}>
			<div className={style.rowItem__color} style={customStyle}></div>
			<div>
				<p className={style.rowItem__title}>{title}</p>
				{children}
			</div>
		</div>
	);
};
