import style from "./GroupTypeItemHeader.module.css";
import { ChipText } from "@/components/ChipText/ChipText";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import StatusCircle from "@/components/StatusCircle/StatusCircle";
import { formatPrice } from "@/helpers/formatPrice";

interface Props {
	onShowData: () => void;
	title: string;
	showData?: boolean;
	data: any;
	typeGroup: any;
	status: any;
	isEditing?: any;
}

export const GroupTypeItemHeader = ({
	onShowData,
	title,
	showData,
	status,
	data,
	isEditing,
}: Props) => {
	const getTotalAmount = (dataArray: any) => {
		const total = dataArray.reduce(
			(acc: any, item: any) => acc + (Number(item.amount) || Number(item.mount) || 0),
			0
		);
		// return total.toFixed(2);
		return formatPrice(total);
	};

	return (
		<div className={style.groupTypeItem__header}>
			<div className={style.groupTypeItem__header__item}>
				<p className={style.groupTypeItem__header__title}>{`${title}`}</p>
				<div className={style.groupTypeItem__header__darkChip}>
					<StatusCircle status={status} size="15px" />
					<p>
						{status === "EDITED"
							? "EDITADO"
							: status === "TO_CHANGE"
							? "CON SOLICITUD DE CAMBIO"
							: status === "PENDING"
							? "PENDIENTE"
							: "APROBADO"}
					</p>
				</div>

				<div>
					<SecondaryButton
						text={showData ? "Minimizar" : "Revisar"}
						onClick={onShowData}
						disabled={isEditing}
					/>
				</div>
			</div>
			<div>
				<ChipText text={`Total: ${getTotalAmount(data)}`} />
			</div>
		</div>
	);
};
