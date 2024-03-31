import style from "./HeaderDetailTransaction.module.css";
import { BoxContent } from "../BoxContent/BoxContent";
import { ChipText } from "@/components/ChipText/ChipText";
import { useAppSelector } from "@/store/hooks";
import { generarFechaCorta } from "@/helpers/generateDate";

interface Props {
	data?: any;
}

export const HeaderDetailTransaction = ({ data }: Props) => {
	const { name, last_name } = useAppSelector((state) => state.auth.login);

	return (
		<BoxContent>
			<div className={style.headerTransaccion__container}>
				<ChipText text={`SKU: ${data?.sku || ""}`} />
				<ChipText text={generarFechaCorta()} />
				<ChipText
					text={`Vendedor: ${
						data?.created_by?.name
							? `${data?.created_by?.name} ${data?.created_by?.last_name}`
							: `${name} ${last_name}`
					} `}
				/>

				<ChipText text={`Empresa: ${data?.company?.name || ""}`} />
				<ChipText text={`Cliente: ${data?.client?.name || ""}`} />
			</div>
		</BoxContent>
	);
};
