const verificarYActualizar = (
	items: any,
	propiedades: string[],
	actualizarEstado: (items: any) => void,
	activarResumen: boolean = true
  ) => {
	console.log('items', items);
	for (const sectionKey in items) {
	  const section = items[sectionKey];
	  
	  // Verificar si la sección está vacía
	  if (section.length < 1) return false;
  
	  for (const item of section) {
		for (const propiedad of propiedades) {
		  if (item[propiedad] === "" || item[propiedad] === null) {
			console.log(`Hay un elemento sin los datos completos en la propiedad ${propiedad}`);
			return true; // Falta datos
		  }
		}
	  }
  
	  if (activarResumen) {
		const updatedItems = section.map((item: any) => ({
		  ...item,
		  resumen: true, // Establece la propiedad resumen a true solo si colocarResumen es true.
		}));
  
		actualizarEstado(updatedItems);
		console.log("Todos los elementos fueron actualizados con resumen: true");
	  }
	}
  
	return false; // Todos los datos están completos
  };
  
  export default verificarYActualizar;
  