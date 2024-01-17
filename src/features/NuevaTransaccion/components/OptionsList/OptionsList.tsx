import { useEffect, useState } from "react";
import style from "./OptionsList.module.css";
import { SelectField } from "@/components/SelectField/SelectField";

interface Props {
	addNewRegister: (tipo: string, subtipo: string) => void;
	listOptions?: any;
	listTitle?: string;
}

export const OptionsList = ({ addNewRegister, listOptions, listTitle }: Props) => {
	const [optionSelect, setOptionSelect] = useState<any>({});
	const [subOptionSelect, setSubOptionSelect] = useState<any>({});

	useEffect(() => {
		if (optionSelect.name) {
			if (optionSelect.hasSubType) {
				if (subOptionSelect.name) {
					addNewRegister(optionSelect.name, subOptionSelect.name);
				}
			} else {
				addNewRegister(optionSelect.name, subOptionSelect.name);
			}
		}
	}, [optionSelect, subOptionSelect]);

	return (
		<>
			{!optionSelect?.hasSubType ? (
				<ul className={style.optionsList__container}>
					{listOptions &&
						listOptions.map((option: any) => (
							<li
								key={option.name}
								className={style.optionList__item}
								onClick={() => setOptionSelect(option)}
							>
								{option.name}
							</li>
						))}

					<li className={style.optionList__section}>{listTitle}</li>
				</ul>
			) : (
				<div className={style.subOptionsList__container}>
					<SelectField
						value={subOptionSelect}
						name=""
						options={optionSelect.subTypeList}
						onChange={(e) => setSubOptionSelect(e.target.value)}
						textLabel={optionSelect.name}
						placeholder="Selecciona el tipo"
					/>
				</div>
			)}
		</>
	);
};
