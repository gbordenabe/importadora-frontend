import style from "./RetencionLayout.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { ChipText } from "@/components/ChipText/ChipText";
import { MaximizarButton } from "@/features/NuevaTransaccion/components/MaximizarButton/MaximizarButton";
import { DeleteButton } from "@/features/NuevaTransaccion/components/DeleteButton/DeleteButton";
import { MinimziarButton } from "@/features/NuevaTransaccion/components/MinimizarButton/MinimizarButton";
import CalendarInput from "@/components/Calendar/Calendar";
import { FaFileMedical } from "react-icons/fa";
import { MoneyBoxField } from "@/components/MoneyBoxField/MoneyBoxField";
import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { UploadModal } from "@/features/NuevaTransaccion/components/UploadModal/UploadModal";
import { formatPrice } from "@/helpers/formatPrice";

interface Props {
	index: number;
	tipo?: string;
	subtipo?: string;
	saldo?: any;
	onChange?: any;
	handleChangeResumen?: any;
	setSaldos?: any;
	setFilesBlob?: any;
	eliminarSaldos?: any;
	fileName?: any;
}

export const RetencionLayout = ({
	index,
	tipo,
	subtipo,
	saldo,
	onChange,
	handleChangeResumen,
	setSaldos,
	setFilesBlob,
	eliminarSaldos,
	fileName,
}: Props) => {
	const uploadFileModal = useModal();

	return (
		<>
			<div className={style.layout__container}>
				{saldo.resumen ? (
					<div className={style.layout__header}>
						<div className={style.layout__header__group}>
							<p className={style.layout__header__title}>{tipo}</p>
							{subtipo && <ChipText text={subtipo} />}
							<div style={{ display: "flex", gap: "5px" }}>
								<ChipText text={`Monto: ${formatPrice(saldo.amount || 0)}`} />
								<FaFileMedical style={{ color: "gray", cursor: "pointer" }} />
							</div>
						</div>
						<div className={style.layout__header__group}>
							<MaximizarButton onClick={() => handleChangeResumen(index, !saldo.resumen)} />
							<DeleteButton onClick={() => eliminarSaldos(index)} />
						</div>
					</div>
				) : (
					<>
						<div className={style.layout__header}>
							<div className={style.layout__header__group}>
								<p className={style.layout__header__title}>{tipo}</p>
								{subtipo && <ChipText text={subtipo} />}
								<div
									style={{ display: "flex", gap: "5px", cursor: "pointer" }}
									onClick={() => uploadFileModal.onVisibleModal()}
								>
									<FaFileMedical style={{ color: "gray", cursor: "pointer" }} />
									<p className={style.layout__header__textAdjunto}>{`${
										fileName ? `(${fileName})` : "(adjunto obligatorio)"
									}`}</p>
								</div>
							</div>
							<div className={style.layout__header__group}>
								<MinimziarButton onClick={() => handleChangeResumen(index, !saldo.resumen)} />
								<DeleteButton onClick={() => eliminarSaldos(index)} />
							</div>
						</div>
						<div className={style.layout__content}>
							<div className={style.layout__content__group__one}>
								<MoneyBoxField
									name="amount"
									value={saldo.amount}
									onChange={onChange}
									placeholder="Monto"
								/>

								<CalendarInput name="date" value={saldo.date} onChange={onChange} />
							</div>
							<div className={style.layout__content__group__two}>
								<TextBoxField
									name="observation"
									value={saldo.observation}
									onChange={onChange}
									placeholder="Observaciones"
								/>
							</div>
						</div>

						{/* Upload modal */}

						<PrimeModal
							header="Carga tu archivo"
							modalStatus={uploadFileModal.modalStatus}
							onHideModal={uploadFileModal.onHideModal}
							width={400}
						>
							<UploadModal
								onChangeFileProp={onChange}
								index={index}
								setChange={setSaldos}
								setFilesBlob={setFilesBlob}
								onHideModal={uploadFileModal.onHideModal}
							/>
						</PrimeModal>
					</>
				)}
			</div>
		</>
	);
};
