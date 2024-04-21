import style from "./FiltroClientes.module.css";
// import { handleChangeCheckBox } from "@/helpers/handleCheckBox";
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
	currentSeller?: any;
	setCurrentSeller?: any;
}

const FiltroVendedores = ({
	optionsFilter,
	setOptionsFilter,
	onHideModal,
	currentSeller,
	setCurrentSeller,
}: Props) => {
	console.log(optionsFilter);
	const [selected, setSelected] = useState<any>(currentSeller);
	const [sellerName, setSellerName] = useState("");
	const [data, setData] = useState([]);

	const token = localStorage.getItem("rt__importadora");

	const getSeller = async () => {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const response = await axios.get(`${url}/user?order_by=user_name&order=ASC&roleId=1`, {
				headers,
			});
			setData(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getSellerFilter = async () => {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const response = await axios.get(
				`${url}/user?nameFilter=${sellerName}&order_by=user_name&order=ASC&roleId=1`,
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
		getSeller();
	}, []);

	const handleUpdateData = () => {
		setOptionsFilter((prev: any) => ({
			...prev,
			sellers: selected?.id ? convertirANumero([selected?.id]) : [],
		}));
		setCurrentSeller(selected ? selected : {});
	};

	const submit = () => {
		handleUpdateData();
		onHideModal();
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, sellerData: any) => {
		if (e.target.checked) {
			setSelected({ id: sellerData.id.toString(), user_name: sellerData.user_name });
		} else {
			if (selected?.id === sellerData.id.toString()) {
				setSelected(null);
			}
		}
	};

	return (
		<div className={style.container}>
			<div className={style.headerFilterTag}>
				<p> Vendedor: </p>
			</div>
			<div className={style.line}></div>

			<div className={style.container__1}>
				<TextBoxField
					name="user_name"
					onChange={(e) => setSellerName(e.target.value)}
					value={sellerName}
				/>

				<PrimaryButton text="Buscar" fitWidth onClick={getSellerFilter} />
			</div>

			<div className={style.line}></div>

			{data?.slice(0, 5).map((sellerData: any) => (
				<div key={sellerData.id}>
					<div className={style.checkboxContainer}>
						<input
							type="checkbox"
							checked={selected?.id === sellerData.id.toString()}
							value={sellerData.id}
							onChange={(e) => handleCheckboxChange(e, sellerData)}
						/>
						<label className={style.btn__filter}>{sellerData.user_name}</label>
					</div>
				</div>
			))}

			<button className={style.buttonConfirm} onClick={submit}>
				Confirmar
			</button>
		</div>
	);
};

export default FiltroVendedores;
