import { useCallback, Dispatch, SetStateAction, useState, useEffect } from "react";
import * as Yup from 'yup';
import useError from "./useError";

export const useDocumentStateHookPayments = (
	documents: any[] | undefined,
	setDocuments: Dispatch<SetStateAction<any[]>>
) => {

    const { errors, setErrors } = useError();

	const validationSchema = Yup.object().shape({
		checks: 
        // Yup.array().of(
			Yup.object().shape({
				document_number_check: Yup.string().required('El número de depósito es requerido'),
				amount_check: Yup.number().required('El monto es requerido'),
				date_check: Yup.date().required('La fecha es requerida'),
				bank_name_check: Yup.string().required('El nombre del banco es requerido'),
				observation_check: Yup.string(),
			})
		// ),
	});

   

	const handleChangeInput = 
		(index: number, event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target;

			// Validar el valor actualizado
			validationSchema.validateAt(`checks.${name}`, { [name]: value })
				.then(() => {
					setErrors((prev: any) => ({ ...prev, checks: { ...prev.checks, [name]: null } }));
				})
				.catch((error) => {
					setErrors((prev: { checks: any; }) => ({ ...prev, checks: { ...prev.checks, [name]: error.message } }));
				});

			const updatedDocuments: any = documents && documents.map((document, i) => {
				if (i === index) {
					return { ...document, [name]: value };
				}
				return document;
			});

			setDocuments(updatedDocuments);
		}

        useEffect(()=>{
            console.log('vuelve a ejecutar handleInput')
        },[handleChangeInput] )

	const handleChangeResumen = useCallback(
		(indice: number, resumen: boolean) => {
			setDocuments((prev) => {
				const updatedDocuments = [...prev];
				updatedDocuments[indice] = {
					...updatedDocuments[indice],
					resumen: resumen,
				};
				return updatedDocuments;
			});
		},
		[setDocuments]
	);

	return { documents, handleChangeInput, handleChangeResumen, errors };
};