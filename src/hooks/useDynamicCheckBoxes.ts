import { useState } from "react";

export interface CheckBoxItem {
	textLabel: string;
	value: boolean;
	name: string;
}

export const useDynamicCheckBoxes = (initialState: CheckBoxItem[]) => {
	const [items, setItems] = useState<CheckBoxItem[]>(initialState);

	const handleChange = (name: string) => {
		setItems((prevItems) => {
			return prevItems.map((item) => {
				if (item.name === name) {
					return {
						...item,
						value: !item.value,
					};
				} else {
					return item;
				}
			});
		});
	};

	return {
		items,
		handleChange,
	};
};
