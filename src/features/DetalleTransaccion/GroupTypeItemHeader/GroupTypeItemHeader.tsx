import style from "./GroupTypeItemHeader.module.css";
import { ChipText } from "@/components/ChipText/ChipText";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";

interface Props {
	onShowData: () => void;
	title: string;
}

export const GroupTypeItemHeader = ({ onShowData, title }: Props) => {
	return (
		<div className={style.groupTypeItem__header}>
			<div className={style.groupTypeItem__header__item}>
				<p className={style.groupTypeItem__header__title}>{`${title}`}</p>
				<div className={style.groupTypeItem__header__darkChip}>
					<div className={style.groupTypeItem__header__color}></div>
					<p>Aprobada por: Nombre del tesorero</p>
				</div>

				<div>
					<SecondaryButton text="Revisar" onClick={onShowData} />
				</div>
			</div>
			<div>
				<ChipText text="Total: -------" />
			</div>
		</div>
	);
};
