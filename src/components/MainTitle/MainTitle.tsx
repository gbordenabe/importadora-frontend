import style from "./MainTitle.module.css";

interface Props {
	title: string;
}

export const MainTitle = ({ title }: Props) => {
	return <h2 className={style.mainTitle}>{title}</h2>;
};
