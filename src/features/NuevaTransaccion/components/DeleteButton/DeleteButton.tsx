import iconoEliminar from "@/assets/icons/icono-eliminar.png";

interface Props {
	onClick?: () => void;
}

export const DeleteButton = ({ onClick }: Props) => {
	return <img src={iconoEliminar} alt="eliminar" onClick={onClick} style={{ cursor: "pointer" }} />;
};
