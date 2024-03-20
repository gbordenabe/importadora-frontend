import { useFormik } from 'formik';
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import style from "./UsuariosTransaccion.module.css";
import { SelectField } from "@/components/SelectField/SelectField";
import { useGetFetch } from "@/hooks/useGetFetch";
import { BlockUI } from "primereact/blockui";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { validationSchema } from '@/helpers/customFormik';
import { useEffect, useRef } from 'react';

interface Props {
	setUsuarios?: any;
	isBlocked?: boolean;
	onChangeStatusGroup?: any;
}


export const UsuariosTransaccion = ({
	setUsuarios,
	isBlocked,
	onChangeStatusGroup,
}: Props) => {
	const ClienteFetch = useGetFetch("/client");
	const UserFetch = useGetFetch("/company");

	const formik = useFormik({
		initialValues: {
			companyId: '',
			clientId: '',
		},
		validationSchema: validationSchema,
		onSubmit: async () => {
			try {
				onChangeStatusGroup("user");
			} catch (error) {
				console.error("Error:", error);
			}
		},
	});

	const formikValuesRef = useRef(formik.values);

	useEffect(() => {
		if (formikValuesRef.current !== formik.values) {
			setUsuarios({ companyId: formik.values.companyId, clientId: formik.values.clientId });
			formikValuesRef.current = formik.values;
		}
	}, [formik.values, setUsuarios]);

	const handleChange = (event: { target: { name: any; value: any; } }) => {
		const { name, value } = event.target;
		const updatedValues = {
			...formik.values,
			[name]: value
		};
		formik.setValues(updatedValues);
	};

	return (
		<div className={style.box__container}>
			<form onSubmit={formik.handleSubmit}>
				<div className={style.box__head}>
					<h2>Usuarios</h2>
					<div>
						{isBlocked ? (
							<SecondaryButton text="Editar" type="submit" />
						) : (
							<PrimaryButton text="Confirmar" type="submit" />
						)}
					</div>
				</div>

				<BlockUI blocked={isBlocked || formik.isSubmitting} style={{ borderRadius: "5px" }}>
					<div className={style.box__content}>
						<div className={style.box__content__item}>
							<SelectField
								textLabel="Empresa"
								value={formik.values.companyId}
								name="companyId"
								options={UserFetch?.data?.data}
								onChange={handleChange}
								error={formik.touched.companyId && formik.errors.companyId}
							/>
						</div>
						<div className={style.box__content__item}>
							<SelectField
								textLabel="Cliente"
								value={formik.values.clientId}
								name="clientId"
								options={ClienteFetch?.data?.data}
								onChange={handleChange}
								error={formik.touched.clientId && formik.errors.clientId}
							/>
						</div>
					</div>
				</BlockUI>
			</form>
		</div>
	);
};

