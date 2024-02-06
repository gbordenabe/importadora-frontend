import style from "./HeaderTransaccion.module.css";
import { BoxContent } from "../BoxContent/BoxContent";
import { ChipText } from "@/components/ChipText/ChipText";
import { useAppSelector } from "@/store/hooks";
import { formatDate } from "@/helpers/formatDate";

interface Props {
	isDetails?: boolean;
	data?:any
}

export const HeaderTransaccion = ({ isDetails = false, data }: Props) => {
	const { name, lastname } = useAppSelector((state) => state.auth.login);
	return (
		<BoxContent>
			<div className={style.headerTransaccion__container}>
				<ChipText text={`SKU: ${data?.sku}`}/>
				<ChipText text={`Fecha: ${formatDate(data?.created_at)}`} />
				<ChipText text={`Vendedor: ${name} ${lastname}`} />

				{isDetails && (
					<>
						<ChipText text={`Empresa: ${data?.company}`} />
						<ChipText text={`Cliente: ${data?.client}`} />
					</>
				)}
			</div>
		</BoxContent>
	);
};
