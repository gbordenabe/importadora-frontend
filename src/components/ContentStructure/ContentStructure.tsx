import style from "./ContentStructure.module.css";

interface Props {
	children: React.ReactNode;
}

export const ContentStructure = ({ children }: Props) => {
	return <div className={style.contentStructure__container}>{children}</div>;
};
