import styles from "./StatusCircle.module.css";
import { IoMdEye } from "react-icons/io";

const StatusCircle = ({ status, size, icon }: any) => {
	const statusColorClass: any = {
		OK: styles.green,
		EDITED: styles.yellow,
		// REJECTED: styles.red,
		PENDING: styles.blue,
		TO_CHANGE: styles.red,
	};

	const colorClass = statusColorClass[status?.toUpperCase()] || styles.green;

	const circleStyle = {
		width: size,
		height: size,
		borderRadius: "50%",
	};

	return (
		<div className={colorClass} style={circleStyle}>
			{icon && (
				<div
					style={{
						width: "25px",
						height: "24px",
						display: "grid",
						placeContent: "center",
					}}
				>
					<IoMdEye size={16} fill={"#fff"} />
				</div>
			)}
		</div>
	);
};

export default StatusCircle;
