import CustomModal from "@/components/CustomModal/CustomModal";
import style from "./StatusFilter.module.css";
import FiltroConEstado from "@/features/vendedor/components/TableroHeader/components/HeaderFiltrados/FiltroConEstados/FiltroConEstado";
import { useModal } from "@/hooks/useModal";
import { useState } from "react";

export const StatusFilter = () => {
	const { modalStatus, onVisibleModal, onHideModal } = useModal();

	const [status, setStatus] = useState("ALL");
	//Tipos de status:
	// ALL = Todos
	// OK = Aprobado
	// TO_CHANGE = Solicitud
	// EDITED = Edición
	// PENDING = En revisión

	const [allDocuments, setAllDocuments] = useState(true);
	const [typeDocument, setTypeDocument] = useState({
		bill_status: "",
		cash_status: "",
		check_status: "",
		credit_note_status: "",
		credit_status: "",
		deposit_status: "",
		retention_status: "",
	});

	const confirmDocument = (newStatus: any) => {
		console.log(newStatus);
	};

	return (
		<>
			<div className={style.header__filtrados__content__item} onClick={onVisibleModal}>
				<div className={style.header__filtrados__content__itemGroup}>
					<p className={style.header__filtrados__text}>Filtrado con estado:</p>

					<div className={style.header__filtrados__selection}>
						{(status == "ALL" || status == "OK") && (
							<div
								className={`${style.header__filtrados__green} ${style.header__filtrados__select__color}`}
							></div>
						)}
						{(status == "ALL" || status == "EDITED") && (
							<div
								className={`${style.header__filtrados__yellow} ${style.header__filtrados__select__color}`}
							></div>
						)}
						{(status == "ALL" || status == "TO_CHANGE") && (
							<div
								className={`${style.header__filtrados__red} ${style.header__filtrados__select__color}`}
							></div>
						)}
						{(status == "ALL" || status == "PENDING") && (
							<div
								className={`${style.header__filtrados__blue} ${style.header__filtrados__select__color}`}
							></div>
						)}
					</div>
				</div>

				<div className={style.header__filtrados__content__itemGroup}>
					<p className={style.header__filtrados__text}>en:</p>

					{allDocuments ? (
						<>
							<div className={style.header__filtrados__documentType}>
								<div className={style.header__filtrados__documentType__item}>Factura</div>
								<div className={style.header__filtrados__documentType__item}>Efectivo</div>
								<div className={style.header__filtrados__documentType__item}>Cheque</div>
								<div className={style.header__filtrados__documentType__item}>Deposito o trans.</div>
								<div className={style.header__filtrados__documentType__item}>Crédito</div>
								<div className={style.header__filtrados__documentType__item}>Nota de crédito</div>
								<div className={style.header__filtrados__documentType__item}>Retención</div>
							</div>
						</>
					) : (
						<>
							<div className={style.header__filtrados__documentType}>
								{typeDocument.bill_status && (
									<div className={style.header__filtrados__documentType__item}>Factura</div>
								)}
								{typeDocument.cash_status && (
									<div className={style.header__filtrados__documentType__item}>Efectivo</div>
								)}
								{typeDocument.check_status && (
									<div className={style.header__filtrados__documentType__item}>Cheque</div>
								)}
								{typeDocument.deposit_status && (
									<div className={style.header__filtrados__documentType__item}>
										Deposito o trans.
									</div>
								)}
								{typeDocument.credit_status && (
									<div className={style.header__filtrados__documentType__item}>Crédito</div>
								)}
								{typeDocument.credit_note_status && (
									<div className={style.header__filtrados__documentType__item}>Nota de crédito</div>
								)}
								{typeDocument.retention_status && (
									<div className={style.header__filtrados__documentType__item}>Retención</div>
								)}
							</div>
						</>
					)}
				</div>
			</div>

			<CustomModal isVisible={modalStatus} onHide={onHideModal} width="45%">
				<FiltroConEstado />
			</CustomModal>
		</>
	);
};

// Efectivo o transferencia = Efectivo
// Deposito = Deposito o transferencia

// Crédito = Solicitud de crédito
// Nota de crédito = NC o Saldo recibido
// Retenciones = Retención Impositiva

{
	/* <div className={style.header__filtrados__content__itemGroup}>
	<p className={style.header__filtrados__text}>en:</p>
	<div className={style.header__filtrados__documentType}>
		<div className={style.header__filtrados__documentType__item}>Factura o débito</div>
		<div className={style.header__filtrados__documentType__item}>Efectivo</div>
		<div className={style.header__filtrados__documentType__item}>Cheques</div>
		<div className={style.header__filtrados__documentType__item}>Deposito o transferencia</div>
		<div className={style.header__filtrados__documentType__item}>Solicitud de crédito</div>
		<div className={style.header__filtrados__documentType__item}>NC o Saldo recibido</div>
		<div className={style.header__filtrados__documentType__item}>Retención Impositiva</div>
	</div>
</div>; */
}
