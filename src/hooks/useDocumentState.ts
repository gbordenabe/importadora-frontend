import { useCallback, Dispatch, SetStateAction } from "react";

export const useDocumentStateHook = (
	documents: any[],
	setDocuments: Dispatch<SetStateAction<any[]>>
) => {
	const handleChangeInput = useCallback(
		(index: number, event: React.ChangeEvent<HTMLInputElement>) => {
			const updatedDocuments = documents.map((document, i) => {
				if (i === index) {
					return { ...document, [event.target.name]: event.target.value };
				}
				return document;
			});

			setDocuments(updatedDocuments);
		},
		[documents, setDocuments]
	);

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

	return { documents, handleChangeInput, handleChangeResumen };
};
