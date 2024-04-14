import style from "./FiltroClientes.module.css";

import { useEffect, useState } from "react";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import axios from "axios";
import { url } from "@/connections/mainApi";

import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { convertirANumero } from "@/helpers/ConvertirANumero";

interface Props {
	optionsFilter?: any;
	setOptionsFilter?: any;
	onHideModal?: any;
	currentClient?: any;
	setCurrentClient?: any;
}

const FiltroClientes = ({
	setOptionsFilter,
	onHideModal,
	currentClient,
	setCurrentClient,
}: Props) => {
	const [selected, setSelected] = useState<any>(currentClient);
	const [clientname, setClientName] = useState("");
	const [data, setData] = useState([]);

	const token = localStorage.getItem("rt__importadora");

	const getClient = async () => {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const response = await axios.get(`${url}/client?order_by=name&order=ASC`, {
				headers,
			});
			setData(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getClientFilter = async () => {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const response = await axios.get(
				`${url}/client?nameFilter=${clientname}&order_by=id&order=ASC`,
				{
					headers,
				}
			);
			setData(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getClient();
	}, []);

	const handleUpdateData = () => {
		if (!selected.id) return;

		setOptionsFilter((prev: any) => ({
			...prev,
			clients: convertirANumero([selected.id]),
		}));
		setCurrentClient(selected ? selected : {});
	};

	const submit = () => {
		handleUpdateData();
		onHideModal();
	};

	return (
		<div className={style.container}>
			<div className={style.headerFilterTag}>
				<p> Cliente: </p>
			</div>
			<div className={style.line}></div>

			<div className={style.container__1}>
				<TextBoxField
					name="clientname"
					onChange={(e) => setClientName(e.target.value)}
					value={clientname}
				/>

				<PrimaryButton text="Buscar" fitWidth onClick={getClientFilter} />
			</div>

			<div className={style.line}></div>

			{data?.map((data: any) => (
				<div key={data.id}>
					<div className={style.checkboxContainer}>
						<input
							type="checkbox"
							checked={selected?.id === data.id.toString()}
							value={data.id}
							onChange={(e) => setSelected({ id: e.target.value, name: data.name })} // Actualización para manejar objeto
						/>
						<label className={style.btn__filter}>
							{data?.client_number} - {data?.name}
						</label>
					</div>
				</div>
			))}

			<button className={style.buttonConfirm} onClick={submit}>
				Confirmar
			</button>
		</div>
	);
};

export default FiltroClientes;
