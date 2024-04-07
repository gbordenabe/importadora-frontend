export const downloadFile = (blob: Blob, fileName: string): void => {
	let excelLink: HTMLAnchorElement | null = document.createElement("a");

	try {
		const url = window.URL.createObjectURL(blob);

		excelLink.href = url;
		excelLink.download = fileName;

		excelLink.style.display = "none";
		document.body.appendChild(excelLink);

		excelLink.click();

		window.URL.revokeObjectURL(url);
	} finally {
		if (excelLink) {
			document.body.removeChild(excelLink);
		}
	}
};
