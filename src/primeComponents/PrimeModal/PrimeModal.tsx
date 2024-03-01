import { Dialog } from "primereact/dialog";

interface Props {
	modalStatus?: boolean;
	onHideModal?: any;
	children?: React.ReactNode;
	header?: any;
	width?: number;
	titleCenter?: boolean;
}

export const PrimeModal = ({
	modalStatus,
	onHideModal,
	children,
	header,
	width = 600,
	titleCenter,
}: Props) => {
	return (
		<Dialog
			header={header}
			visible={modalStatus}
			modal
			draggable={false}
			style={{ width: `${width}px` }}
			onHide={onHideModal}
			dismissableMask={true}
			headerStyle={{
				textAlign: `${(titleCenter && "center") || "start"}`,
				paddingLeft: `${titleCenter && "42px"} `,
			}}
		>
			{children}
		</Dialog>
	);
};
