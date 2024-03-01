import React, { ChangeEvent } from "react";
import style from "./TextBoxField.module.css";

import { InputText } from "primereact/inputtext";

interface TextBoxFieldProps {
	textLabel?: string;
	value: string | undefined;
	name?: string;
	type?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	direction?: "row" | "column";
	disabled?: boolean;
	labelWidth?: string;
	placeholder?: string;
}

export const TextBoxField = ({
	textLabel,
	value,
	name,
	type = "text",
	onChange,
	direction = "column",
	disabled = false,
	labelWidth = "100%",
	placeholder = "",
}: TextBoxFieldProps) => {
	const styles: React.CSSProperties = {
		width: labelWidth,
		fontSize: "15px",
	};

	return (
		<div
			className={`${style.item__group} ${
				direction === "column" ? style.item__column : style.item__row
			}`}
		>
			{textLabel ? <label style={styles}>{textLabel}</label> : <></>}

			<InputText
				className="p-inputtext-sm"
				style={{ minWidth: "150px" }}
				value={value}
				name={name}
				type={type}
				onChange={onChange}
				autoComplete="off"
				disabled={disabled}
				placeholder={placeholder}
			/>
		</div>
	);
};
