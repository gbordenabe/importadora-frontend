import style from "./HeaderTransaccion.module.css";
import { BoxContent } from "../BoxContent/BoxContent";
import { ChipText } from "@/components/ChipText/ChipText";
import { useAppSelector } from "@/store/hooks";

interface Props {
	isDetails?: boolean;
}

export const HeaderTransaccion = ({ isDetails = false }: Props) => {
	const { name, lastname } = useAppSelector((state) => state.auth.login);
	return (
		<BoxContent>
			<div className={style.headerTransaccion__container}>
				<ChipText text="SKU: 123011112023-IMP-C000001" />
				<ChipText text="Fecha: 11 - 11 - 2023" />
				<ChipText text={`Vendedor: ${name} ${lastname}`} />

				{isDetails && (
					<>
						<ChipText text="Empresa: nombre de la empresa" />
						<ChipText text="Cliente: nombre del cliente" />
					</>
				)}
			</div>
		</BoxContent>
	);
};
