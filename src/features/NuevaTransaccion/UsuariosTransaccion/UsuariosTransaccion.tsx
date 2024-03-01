import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import style from "./UsuariosTransaccion.module.css";
import { SelectField } from "@/components/SelectField/SelectField";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { useGetFetch } from "@/hooks/useGetFetch";
import { BlockUI } from "primereact/blockui";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";

interface Props {
	usuarios?: any;
	setUsuarios?: any;
	sku?: any;
	isBlocked?: boolean;
	onChangeStatusGroup?: any;
}

export const UsuariosTransaccion = ({
	usuarios,
	setUsuarios,
	isBlocked,
	onChangeStatusGroup,
}: Props) => {
	const ClienteFetch = useGetFetch("/client");
	const UserFetch = useGetFetch("/company");

	return (
		<div className={style.box__container}>
			<div className={style.box__head}>
				<h2>Usuarios</h2>
				<div>
					{isBlocked ? (
						<SecondaryButton text="Editar" onClick={() => onChangeStatusGroup("user")} />
					) : (
						<PrimaryButton text="Confirmar" onClick={() => onChangeStatusGroup("user")} />
					)}
				</div>
			</div>

			<BlockUI blocked={isBlocked} style={{ borderRadius: "5px" }}>
				<div className={style.box__content}>
					<div className={style.box__content__item}>
						<SelectField
							textLabel="Empresa"
							value={usuarios.empresa}
							name="empresa"
							options={UserFetch?.data?.data}
							onChange={(e) => handleChangeInput(e, setUsuarios)}
						/>
					</div>
					<div className={style.box__content__item}>
						<SelectField
							textLabel="Cliente"
							value={usuarios.cliente}
							name="cliente"
							options={ClienteFetch?.data?.data}
							onChange={(e) => handleChangeInput(e, setUsuarios)}
						/>
					</div>
				</div>
			</BlockUI>
		</div>
	);
};
