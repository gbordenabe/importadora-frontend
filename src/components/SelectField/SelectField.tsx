import React from "react";
import style from "./SelectField.module.css";

import { Dropdown } from "primereact/dropdown";

interface SelectFieldProps {
	textLabel?: string;
	value: string | undefined | number;

	name: string;
	placeholder?: string;
	optionLabel?: string;
	onChange: (e: any) => void;
	options: any[];
	direction?: "row" | "column";
	labelWidth?: string;
	disabled?: boolean;
}

export const SelectField = ({
	textLabel,
	value,
	name,
	placeholder = "Seleccione una opción",
	optionLabel = "name",
	onChange,
	options,
	direction = "column",
	labelWidth = "100%",
	disabled = false,
}: SelectFieldProps) => {
	const styles: React.CSSProperties = {
		width: labelWidth,
		fontSize: "16px",
	};

	return (
		<div className={`${direction == "column" ? style.column__item : style.row__item}`}>
			{textLabel ? <label style={styles}>{textLabel}</label> : <></>}

			<Dropdown
				className="p-inputtext-sm"
				value={value}
				name={name}
				onChange={onChange}
				options={options}
				disabled={disabled}
				optionLabel={optionLabel}
				placeholder={placeholder}
				emptyMessage={<p className={style.emptyMessage__text}>No hay resultados.</p>}
			/>
		</div>
	);
};
