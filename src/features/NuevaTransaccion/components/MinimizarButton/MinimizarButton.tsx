import iconoMinimizar from "@/assets/icons/icono-minimizar.png";

interface Props {
	onClick?: () => void;
}

export const MinimziarButton = ({ onClick }: Props) => {
	return (
		<img src={iconoMinimizar} alt="eliminar" onClick={onClick} style={{ cursor: "pointer" }} />
	);
};
