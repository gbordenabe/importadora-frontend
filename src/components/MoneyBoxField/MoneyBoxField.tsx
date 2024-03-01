import React from "react";
import style from "./MoneyBoxField.module.css";

import { InputNumber } from "primereact/inputnumber";

interface TextBoxFieldProps {
	textLabel?: string;
	value: number | undefined;
	name: string;
	type?: string;
	onChange: any;
	direction?: "row" | "column";
	disabled?: boolean;
	labelWidth?: string;
	placeholder?: string;
}

export const MoneyBoxField = ({
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

			<InputNumber
				className="p-inputtext-sm"
				inputStyle={{ minWidth: "150px", width: "100%" }}
				value={value}
				name={name}
				type={type}
				onValueChange={onChange}
				disabled={disabled}
				placeholder={placeholder}
				mode="currency"
				currency="USD"
				locale="en-US"
			/>
		</div>
	);
};
