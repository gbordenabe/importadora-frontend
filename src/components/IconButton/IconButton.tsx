import style from "./IconButton.module.css";

interface Props {
	icon: React.ReactNode;
}

export const IconButton = ({ icon }: Props) => {
	return <div className={style.icon__container}>{icon}</div>;
};
