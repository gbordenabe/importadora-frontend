const verificarYActualizar = (
	items: any,
	propiedades: string[],
	actualizarEstado: (items: any) => void,
	activarResumen: boolean = true,
	setErrorDuplicatedBill?: (value: boolean) => void 
) => {
	for (const sectionKey in items) {
		const section = items[sectionKey];
		if (section && section.length > 0) {

			for (const item of section) {
				for (const propiedad of propiedades) {

					if (item[propiedad] === "" || item[propiedad] === null) {
						console.log(`Hay un elemento sin los datos completos en la propiedad ${propiedad}`);
						return {loadData: true, message: "requiredData"}; // Falta datos
					}
				}

				if (sectionKey === "bills") {
                    const duplicateNumber = section.filter((bill: any) => bill.number === item.number);
                    if (duplicateNumber.length > 1) {
						setErrorDuplicatedBill && setErrorDuplicatedBill(true)
					
                        console.log(`El N° de factura ${item.number} ya existe`);
                        return {loadData: true, message: "duplicatedBill"}; // Falta datos
                    }
                }

				if (sectionKey === "deposits" || sectionKey === "retentions") {
                    if (item.file_field_name === "" || item.file_field_name === null) {
                        console.log(`Hay un elemento sin el nombre de archivo en la propiedad file_field_name`);
                        return { loadData: true, message: "requiredFileName" }; // Falta el nombre del archivo
                    }
                }
			}
			
		}

		if (activarResumen) {
			const updatedItems = section.map((item: any) => ({
				...item,
				resumen: true, // Establece la propiedad resumen a true solo si colocarResumen es true.
			}));

			actualizarEstado((prevState: any) => ({
				...prevState,
				[sectionKey]: updatedItems,
			}));

			console.log(`Todos los elementos de la sección ${sectionKey} fueron actualizados con resumen: true`);
		}
	}
	return false; // Todos los datos están completos
};

export default verificarYActualizar;

