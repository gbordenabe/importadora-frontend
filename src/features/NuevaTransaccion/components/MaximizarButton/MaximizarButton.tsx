import iconoMaximizar from "@/assets/icons/icono-maximizar.png";

interface Props {
	onClick?: () => void;
}

export const MaximizarButton = ({ onClick }: Props) => {
	return (
		<img src={iconoMaximizar} alt="eliminar" onClick={onClick} style={{ cursor: "pointer" }} />
	);
};
