import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import style from "./UsuariosTransaccion.module.css";
import { SelectField } from "@/components/SelectField/SelectField";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { handleChangeInput } from "@/helpers/handleTextBox";

interface Props {
	usuarios?: any;
	setUsuarios?: any;
}

export const UsuariosTransaccion = ({ usuarios, setUsuarios }: Props) => {
	return (
		<div className={style.box__container}>
			<div className={style.box__head}>
				<h2>Usuarios</h2>
				<div>
					<PrimaryButton text="Confirmar" />
				</div>
			</div>

			<div className={style.box__content}>
				<div className={style.box__content__item}>
					<SelectField
						textLabel="Empresa"
						value={usuarios.empresa}
						name="empresa"
						options={[]}
						onChange={(e) => handleChangeInput(e, setUsuarios)}
					/>
				</div>
				<div className={style.box__content__item}>
					<TextBoxField
						textLabel="Cliente"
						value={usuarios.cliente}
						name="cliente"
						onChange={(e) => handleChangeInput(e, setUsuarios)}
						placeholder="Nombre del cliente"
					/>
				</div>
			</div>
		</div>
	);
};
