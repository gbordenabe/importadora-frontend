import { BoxContent } from "@/components/BoxContent/BoxContent";
import style from "./FiltradoTablero.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { IconButton } from "@/components/IconButton/IconButton";
import { RiArrowUpDownLine } from "react-icons/ri";
import { IoMdRefresh } from "react-icons/io";

export const FiltradoTablero = () => {
	return (
		<BoxContent>
			<div className={style.item__group__container}>
				<div className={style.item__group}>
					<TextBoxField
						textLabel="Nombre:"
						placeholder="Buscar"
						value=""
						name=""
						onChange={() => {}}
						direction="row"
					/>
					<IconButton icon={<RiArrowUpDownLine size={20} />} />
				</div>

				<IconButton icon={<IoMdRefresh size={20} />} />
			</div>
		</BoxContent>
	);
};
