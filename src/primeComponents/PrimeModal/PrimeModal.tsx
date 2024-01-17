import { Dialog } from "primereact/dialog";

interface Props {
	modalStatus?: boolean;
	onHideModal?: any;
	children?: React.ReactNode;
	header?: any;
	width?: number;
}

export const PrimeModal = ({ modalStatus, onHideModal, children, header, width = 600 }: Props) => {
	return (
		<Dialog
			header={header}
			visible={modalStatus}
			modal
			draggable={false}
			style={{ width: `${width}px` }}
			onHide={onHideModal}
			dismissableMask={true}
		>
			{children}
		</Dialog>
	);
};
