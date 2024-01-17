import { AppStructure } from "@/components/AppStructure/AppStructure";
// import style from "./DetalleTransaccion.module.css";
import { MainHeader } from "@/components/MainHeader/MainHeader";
import { ContentStructure } from "@/components/ContentStructure/ContentStructure";
import { MainTitle } from "@/components/MainTitle/MainTitle";
import { BoxContent } from "@/components/BoxContent/BoxContent";
import { HeaderTransaccion } from "../../components/HeaderTransaccion/HeaderTransaccion";
import { GroupTypeItem } from "./GroupTypeItem/GroupTypeItem";

export const DetalleTransaccion = () => {
	return (
		<AppStructure>
			<MainHeader />
			<ContentStructure>
				<MainTitle title="Revisión de transacción" />

				<BoxContent>
					<HeaderTransaccion isDetails={true} />

					<GroupTypeItem columns={columns} data={data} title={"Factura o nota de debito (1)"} />
					<GroupTypeItem columns={columns} data={data} title={"Cheques (3)"} />
					<GroupTypeItem columns={columns} data={data} title={"Deposito (1) / Transferencia (1)"} />
					<GroupTypeItem columns={columns} data={data} title={"Credito (3)"} />
					<GroupTypeItem columns={columns} data={data} title={"Nota de credito (2)"} />
					<GroupTypeItem columns={columns} data={data} title={"Retencion (2)"} />
				</BoxContent>
			</ContentStructure>
		</AppStructure>
	);
};

const columns = [
	{
		nombre: "N° Factura",
		campo: "factura",
	},
	{
		nombre: "Monto",
		campo: "mount",
	},
	{
		nombre: "Fecha",
		campo: "date",
	},

	{
		nombre: "Observaciones",
		campo: "obs",
		width: "200px",
	},
];

const data = [
	{
		factura: "123456789",
		mount: "100.00",
		date: "10/10/24",
		obs: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam numquam minima deserunt veritatis quasi corporis unde mollitia cum, voluptatem hic debitis pariatur et voluptatibus id ipsum atque inventore optio velit!",
	},
];
