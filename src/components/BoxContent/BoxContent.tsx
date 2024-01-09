import style from "./BoxContent.module.css";

interface Props {
	children: React.ReactNode;
}

export const BoxContent = ({ children }: Props) => {
	return <div className={style.boxContent__container}>{children}</div>;
};
