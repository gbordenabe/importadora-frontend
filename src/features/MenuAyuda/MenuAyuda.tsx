import style from "./MenuAyuda.module.css";
import { Divider } from "primereact/divider";
import { MainButton } from "@/components/MainButton/MainButton";
import { RowItem } from "./components/RowItem";

interface Props {
	onHideModal?: any;
}

export const MenuAyuda = ({ onHideModal }: Props) => {
	return (
		<div className={style.column__container}>
			<p>
				Los estados de transacción muestran de forma rápida a travez de los colores en que proceso
				se encuentra la transacción. El primer estado una vez creada es <b>“pendiente”</b> lo que
				refiere a que la transacción necesita una revisión y aprobación por parte de tesorería
			</p>
			<Divider />
			<RowItem title="Pendientes" codeColor="#629BF8">
				<p>
					Son aquellas transacciones que fueron creadas y necesitan una revisión por parte de un{" "}
					<b>Tesorero.</b>
				</p>
			</RowItem>
			<Divider />
			<RowItem title="Con Solicitud de cambio" codeColor="#D72F2F">
				<p>
					Son aquellas transacciones que necesitan ser editadas por un <b>Vendedor</b> ya que la
					misma tiene algún error o necesita un archivo adjunto, etc.
				</p>
			</RowItem>
			<Divider />
			<RowItem title="Con edición" codeColor="#FFE600">
				<p>
					Son aquellas transacciones o acciones que han sido editadas por un{" "}
					<b>Vendedor o Tesorero.</b>
				</p>
			</RowItem>
			<Divider />
			<RowItem title="Aprobadas" codeColor="#89DC7F">
				<p>
					Son aquellas transacciones que han sido aprobadas en su totalidad por un <b>Tesorero.</b>
				</p>
			</RowItem>
			<Divider />

			<div>
				<MainButton text="Entendido" onClick={onHideModal} />
			</div>
		</div>
	);
};
