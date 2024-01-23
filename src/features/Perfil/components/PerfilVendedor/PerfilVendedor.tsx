import { useState } from "react";
import style from "./PerfilVendedor.module.css";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { handleChangeInput } from "@/helpers/handleTextBox";

interface Props {
  onHideModal?: any;
}

export const PerfilVendedor = ({ onHideModal }: Props) => {
  const [nuevoVendedor, setNuevoVendedor] = useState({
    usuario: "",
    nombre: "",
    apellido: "",
    contraseña: "",
	nuevacontraseña:"",
    email: "",
    verificarEmail: "",
    ciudad: "",
    localidad: "",
    provincia: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <>
      {isUpdate ? (
        <div className={style.form__container}>
          <h2 className={style.title__form}>Editar Perfil</h2>
          <div className={style.form__group}>
            <TextBoxField
              textLabel="Nombre de usuario:"
              name="usuario"
              value={nuevoVendedor.usuario}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Nombre:"
              name="nombre"
              value={nuevoVendedor.nombre}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Apellido:"
              name="apellido"
              value={nuevoVendedor.apellido}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Contraseña:"
              name="contraseña"
              value={nuevoVendedor.contraseña}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
			<TextBoxField
              textLabel="Repetir Contraseña:"
              name="contraseña"
              value={nuevoVendedor.nuevacontraseña}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Email:"
              name="email"
              type="email"
              value={nuevoVendedor.email}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
			<TextBoxField
              textLabel="Repetir Email:"
              name="email"
              type="email"
              value={nuevoVendedor.verificarEmail}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Ciudad:"
              name="ciudad"
              value={nuevoVendedor.ciudad}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Localidad:"
              name="localidad"
              value={nuevoVendedor.localidad}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Provincia:"
              name="provincia"
              value={nuevoVendedor.provincia}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
          </div>

          <div className={style.container__buttons}>
            <SecondaryButton text="Volver" onClick={onHideModal} fitWidth />

            <SecondaryButton
              text="Guardar"
              onClick={() => console.log("cambia de estado") }
              fitWidth
            />
          </div>
        </div>
      ) : (
        <div className={style.form__container}>
          <h2 className={style.title__form}>Perfil del Vendedor</h2>
          <div className={style.form__group}>
            <TextBoxField
              textLabel="Nombre de usuario:"
              name="usuario"
              value={nuevoVendedor.usuario}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Nombre:"
              name="nombre"
              value={nuevoVendedor.nombre}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Apellido:"
              name="apellido"
              value={nuevoVendedor.apellido}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Contraseña:"
              name="contraseña"
              value={nuevoVendedor.contraseña}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Email:"
              name="email"
              type="email"
              value={nuevoVendedor.email}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Ciudad:"
              name="ciudad"
              value={nuevoVendedor.ciudad}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Localidad:"
              name="localidad"
              value={nuevoVendedor.localidad}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Provincia:"
              name="provincia"
              value={nuevoVendedor.provincia}
              onChange={(e) => handleChangeInput(e, setNuevoVendedor)}
              direction="row"
              labelWidth="160px"
            />
          </div>

          <div className={style.container__buttons}>
            <SecondaryButton text="Volver" onClick={onHideModal} fitWidth />

            <SecondaryButton
              text="Editar"
			  onClick={() => setIsUpdate(true)}
              fitWidth
            />
          </div>
        </div>
      )}
    </>
  );
};
