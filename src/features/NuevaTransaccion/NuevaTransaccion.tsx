import { useEffect, useState } from "react";
import style from "./NuevaTransaccion.module.css";
import { AppStructure } from "../../components/AppStructure/AppStructure";
import { MainHeader } from "../../components/MainHeader/MainHeader";
import { ContentStructure } from "../../components/ContentStructure/ContentStructure";
import { MainTitle } from "@/components/MainTitle/MainTitle";
import { BoxContent } from "../../components/BoxContent/BoxContent";
import { UsuariosTransaccion } from "./UsuariosTransaccion/UsuariosTransaccion";
import { PagosTransaccion } from "./PagosTransaccion/PagosTransaccion";
import { FacturaTransaccion } from "./FacturaTransaccion/FacturaTransaccion";
import { SaldosTransaccion } from "./SaldosTransaccion/SaldosTransaccion";
import { MainButton } from "@/components/MainButton/MainButton";
import { clasificarPagos } from "@/helpers/convertirPagos";
import { clasificarSaldos } from "@/helpers/convertirSaldos";
import axios from "axios";
import { url } from "@/connections/mainApi";
import { generarFecha } from "@/helpers/generateDate";
import { useNavigate } from "react-router-dom";
import { HeaderCreateTransaccion } from "./components/HeaderCreateTransaccion/HeaderCreateTransaccion";
import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { ValidationModal } from "./ValidationModal/ValidationModal";
import verificarYActualizar from "@/helpers/verificarYActualizar";
import { CancelarTransaccionModal } from "./CancelarTransaccionModal/CancelarTransaccionModal";
import Loading from "@/components/Loading/Loading";
import { clasificarFacturas } from "@/helpers/convertirFacturas";
import { useToggleExpandedContext } from "@/hooks/toggleExpandedContext";

export const NuevaTransaccion = () => {
	const navigate = useNavigate();
	const errorTransaction = useModal();
	const errorConfirmTransaction = useModal();
	const cancelarTransaccionModal = useModal();
	const errorAllSectionCompleted = useModal();
	const errorBillValidation = useModal();
	const [sku, setSku] = useState("");
	const [usuarios, setUsuarios] = useState<any>({ companyId: undefined, clientId: undefined });

	const [facturas, setFacturas] = useState<any>();
	const [pagos, setPagos] = useState<any>();
	const [saldos, setSaldos] = useState<any>();

	const [filesBlob, setFilesBlob] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);

	const [errorDuplicatedBill, setErrorDuplicatedBill] = useState(false);
	const [errorRequiredData, setErrorRequiredData] = useState(false);

	const { expandedItems, toggleExpanded, expandedSaldos, toggleExpandedSaldos, expandedPagos, toggleExpandedPagos} = useToggleExpandedContext();

	// Total status
	const [totalFacturas, setTotalFacturas] = useState(0);
	const [totalPagos, setTotalPagos] = useState(0);
	const [totalSaldos, setTotalSaldos] = useState(0);

	// Bloquear cuadro
	const [groupStatus, setGroupStatus] = useState({
		userSectionStatus: false,
		facturaSectionStatus: true,
		pagosSectionStatus: true,
		saldosSectionStatus: true,
	});

	// Crear transacción
	const createTransaction = async (data: any) => {
		setLoading(true);
		try {

			const token = localStorage.getItem("rt__importadora");
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			await axios.post(`${url}/transaction`, data, {
				headers,
			});

			navigate("/tablero-vendedor");
		} catch (error: any) {
			errorConfirmTransaction.onVisibleModal();
		}
		finally {
			setLoading(false);
		}
	};

	const handleCreateTransaction = () => {
		 const allSectionsConfirmed = Object.values(groupStatus).every(status => status);

		 if (!allSectionsConfirmed) {
			errorAllSectionCompleted.onVisibleModal();
			 return;
		 }
	 
		if (totalFacturas != totalPagos + totalSaldos) {
			errorTransaction.onVisibleModal();
			return;
		}
		const pagosClasificados = clasificarPagos(pagos);
		const saldosClasificados = clasificarSaldos(saldos);
		const facturasClasificadas = clasificarFacturas(facturas);

		let newTransaction = {
			sku,
			companyId: usuarios.companyId?.id,
			clientId: usuarios.clientId?.id,
			...facturasClasificadas,
			...pagosClasificados,
			...saldosClasificados,
		};

		const formData = new FormData();

		filesBlob.forEach((file: any) => {
			formData.append(file.fileName, file.blob, file.fileName);
		});

		for (const [key, value] of Object.entries(newTransaction)) {
			if (Array.isArray(value)) {
				formData.append(key, JSON.stringify(value));
			} else {
				formData.append(key, value as string);
			}
		}

		createTransaction(formData);
	};

	useEffect(() => {
		if (sku.length === 0) {
			const fecha = generarFecha();
			setSku(fecha);
		}
	}, []);

	useEffect(() => {
		if (usuarios.clientId && usuarios.companyId && sku.length > 0) {
			const partes = sku.split("-");
			const clienteRef = usuarios.clientId.client_number || usuarios.clientId.id;
			const clienteRefConCeros = clienteRef.toString().padStart(6, "0");
			const clienteFinal = `${clienteRefConCeros}`;
			const nuevoSku = `${partes[0]}-${usuarios.companyId.acronym}-${clienteFinal}`;
			setSku(nuevoSku);
		}
	}, [usuarios.companyId, usuarios.clientId]);

	const onChangeStatusGroup = (sectionName: string) => {
		let properties: string[];
		//funcion hecha por dav
		if (sectionName === "user") {
			if (!groupStatus.userSectionStatus) {
				if (!usuarios.clientId || !usuarios.companyId) return;
				setGroupStatus({
					userSectionStatus: true,
					facturaSectionStatus: false,
					pagosSectionStatus: true,
					saldosSectionStatus: true,
				});
				return;
			} else {
				setGroupStatus({
					userSectionStatus: false,
					facturaSectionStatus: true,
					pagosSectionStatus: true,
					saldosSectionStatus: true,
				});
				return;
			}
		}

		if (sectionName === "facturas") {
			if (!groupStatus.facturaSectionStatus) {
				if (facturas && facturas.bills.length < 1) {
					errorBillValidation.onVisibleModal();
					return;
				}
				let verifyData = verificarYActualizar(
					facturas,
					["number", "amount", "date"],
					setFacturas,
					setErrorDuplicatedBill as any
				);

				//Si es true, es porque faltan datos
				if (verifyData && verifyData.loadData) {
					if (verifyData.message === "duplicatedBill") {
						setErrorDuplicatedBill(true);
						errorBillValidation.onVisibleModal();
						return;
					} else {
						setErrorRequiredData(true);
						errorBillValidation.onVisibleModal();
						return;
					}
				}

					Object.keys(expandedItems).map((index: any) => {
						toggleExpanded(index, "allMin");
					});

				setGroupStatus({
					userSectionStatus: true,
					facturaSectionStatus: true,
					pagosSectionStatus: false,
					saldosSectionStatus: true,
				});
			} else {
				if (!usuarios.clientId || !usuarios.companyId) return;
				setGroupStatus({
					userSectionStatus: true,
					facturaSectionStatus: false,
					pagosSectionStatus: true,
					saldosSectionStatus: true,
				});
			}
		}

		if (sectionName === "pagos") {
			properties = ["document_number", "amount", "date"];

			if (!groupStatus.pagosSectionStatus) {
				let verifyData = verificarYActualizar(pagos, properties, setPagos);
				if (verifyData) return; //Si es true, es porque faltan datos

				Object.keys(expandedPagos).map((index: any) => {
					toggleExpandedPagos(index, "allMin");
				});

				setGroupStatus({
					userSectionStatus: true,
					facturaSectionStatus: true,
					pagosSectionStatus: true,
					saldosSectionStatus: false,
				});
			} else {
				if (!usuarios.clientId || !usuarios.companyId) return;
				// Validar si facturas tiene data
				if (facturas && facturas.bills.length < 1) return;
				let verifyData = verificarYActualizar(facturas, ["number", "amount", "date"], setFacturas);
				if (verifyData) return; //Si es true, es porque faltan datos
				setGroupStatus({
					userSectionStatus: true,
					facturaSectionStatus: true,
					pagosSectionStatus: false,
					saldosSectionStatus: true,
				});
			}
		}

		if (sectionName === "saldos") {
			if (!groupStatus.saldosSectionStatus) {
				let verifyData = verificarYActualizar(saldos, ["amount", "date"], setSaldos);
				if (verifyData) return; //Si es true, es porque faltan datos

				Object.keys(expandedSaldos).map((index: any) => {
					toggleExpandedSaldos(index, 'allMin');
				});

				setGroupStatus({
					userSectionStatus: true,
					facturaSectionStatus: true,
					pagosSectionStatus: true,
					saldosSectionStatus: true,
				});
			} else {
				if (!usuarios.clientId || !usuarios.companyId) return;
				// // Validar si facturas tiene data
				if (facturas && facturas.bills.length < 1) return;
				let verifyData = verificarYActualizar(facturas, ["number", "amount", "date"], setFacturas);
				if (verifyData) return; //Si es true, es porque faltan datos
				setGroupStatus({
					userSectionStatus: true,
					facturaSectionStatus: true,
					pagosSectionStatus: true,
					saldosSectionStatus: false,
				});
			}
		}
	};

	return (
		<>
			<AppStructure>

				<>
					<MainHeader />
					<ContentStructure>
						<MainTitle
							title="Nueva Transacción"
							onShowModal={() => cancelarTransaccionModal.onVisibleModal()}
							isShowModal={true}
						/>

						<BoxContent>
							<HeaderCreateTransaccion sku={sku} />

							<div className={style.tipo__documentos__container}>
								<div className={style.tipo__documentos__group}>
									<UsuariosTransaccion
										setUsuarios={setUsuarios}
										isBlocked={groupStatus.userSectionStatus}
										onChangeStatusGroup={onChangeStatusGroup}
									/>

									<FacturaTransaccion
										facturas={facturas}
										setFacturas={setFacturas}
										isBlocked={groupStatus.facturaSectionStatus}
										onChangeStatusGroup={onChangeStatusGroup}
										setTotalAmount={setTotalFacturas}
									/>
								</div>

								<div className={style.tipo__documentos__group}>
									<PagosTransaccion
										setPagos={setPagos}
										isBlocked={groupStatus.pagosSectionStatus}
										onChangeStatusGroup={onChangeStatusGroup}
										setTotalAmount={setTotalPagos}
										setFilesBlob={setFilesBlob}
									/>

									<SaldosTransaccion
										setSaldos={setSaldos}
										isBlocked={groupStatus.saldosSectionStatus}
										onChangeStatusGroup={onChangeStatusGroup}
										setTotalAmount={setTotalSaldos}
										setFilesBlob={setFilesBlob}
									/>
								</div>
							</div>
						</BoxContent>

						<div className={style.container__1}>
							<MainButton text="Confirmar transacción" onClick={handleCreateTransaction} />
						</div>
					</ContentStructure>
					{loading && <Loading />}
				</>

			</AppStructure>

			{/* ErrorSum Modal */}
			<PrimeModal
				header={
					facturas && facturas.bills.length < 1
						? "Error al confirmar transacción"
						: "Error en la suma"
				}
				modalStatus={errorTransaction.modalStatus}
				onHideModal={errorTransaction.onHideModal}
				titleCenter
			>
				<ValidationModal
					onHideModal={errorTransaction.onHideModal}
					description={
						facturas && facturas.bills.length < 1
							? "Falta cargar información para confirmar transacción"
							: "El monto de facturación no coincide con la suma de pagos y saldos"
					}
					textButton="Volver"
				/>
			</PrimeModal>

			{/* ErrorAllSectionConfirm Modal */}
			<PrimeModal
				header={'Error en transaccion'}
				modalStatus={errorAllSectionCompleted.modalStatus}
				onHideModal={errorAllSectionCompleted.onHideModal}
				titleCenter
			>
				<ValidationModal
					onHideModal={errorAllSectionCompleted.onHideModal}
					description={'Confirme para crear una transaccion'}
					textButton="Volver"
				/>
			</PrimeModal>

			{/* Cancelar Transaccion Modal */}
			<PrimeModal
				header="Cancelar creación"
				modalStatus={cancelarTransaccionModal.modalStatus}
				onHideModal={cancelarTransaccionModal.onHideModal}
				titleCenter
			>
				<CancelarTransaccionModal onHideModal={cancelarTransaccionModal.onHideModal} />
			</PrimeModal>

			{/* Error Transaction Modal */}
			<PrimeModal
				header="Error en confirmar transacción"
				modalStatus={errorConfirmTransaction.modalStatus}
				onHideModal={errorConfirmTransaction.onHideModal}
				titleCenter
			>
				<ValidationModal
					onHideModal={errorConfirmTransaction.onHideModal}
					description={"Por favor intente nuevamente"}
					textButton="Volver"
				/>
			</PrimeModal>

			{/* {errorDuplicatedBill && ( */}
			<PrimeModal
				header="Error en la carga de facturas"
				modalStatus={errorBillValidation.modalStatus}
				onHideModal={errorBillValidation.onHideModal}
				titleCenter
			>
				<ValidationModal
					onHideModal={errorBillValidation.onHideModal}
					description={
						errorDuplicatedBill
							? "No puedes continuar con una factura con el mismo número"
							: errorRequiredData
								? "Faltar completar datos requeridos"
								: "Tienes que cargar una factura para confirmar"
					}
					textButton="Volver"
				/>
			</PrimeModal>

		</>
	);
};
