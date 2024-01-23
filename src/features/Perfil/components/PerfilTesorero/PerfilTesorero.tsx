import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import style from "./PerfilTesorero.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { useState } from "react";

interface Props {
  onHideModal?: any;
}

export const PerfilTesorero = ({ onHideModal }: Props) => {
  const [nuevoTesorero, setNuevoTesorero] = useState({
    usuario: "",
    nombre: "",
    apellido: "",
    contraseña: "",
    verificarContraseña: "",
    email: "",
    verificarEmail: "",
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
              value={nuevoTesorero.usuario}
              onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Nombre:"
              name="nombre"
              value={nuevoTesorero.nombre}
              onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Apellido:"
              name="apellido"
              value={nuevoTesorero.apellido}
              onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Contraseña:"
              name="contraseña"
              value={nuevoTesorero.contraseña}
              onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Repetir Contraseña:"
              name="contraseña"
              value={nuevoTesorero.verificarContraseña}
              onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Email:"
              name="email"
              type="email"
              value={nuevoTesorero.email}
              onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Repetir Email:"
              name="email"
              type="email"
              value={nuevoTesorero.verificarEmail}
              onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
              direction="row"
              labelWidth="160px"
            />
          </div>

          <div className={style.container__buttons}>
            <SecondaryButton text="Volver" onClick={onHideModal} fitWidth />

            <SecondaryButton
              text="Guardar"
              onClick={() => console.log("cambia de estado")}
              fitWidth
            />
          </div>
        </div>
      ) : (
        <div className={style.form__container}>
          <h2 className={style.title__form}>Perfil del Tesorero</h2>
          <div className={style.form__group}>
            <TextBoxField
              textLabel="Nombre de usuario:"
              name="usuario"
              value={nuevoTesorero.usuario}
              onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Nombre:"
              name="nombre"
              value={nuevoTesorero.nombre}
              onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Apellido:"
              name="apellido"
              value={nuevoTesorero.apellido}
              onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Contraseña:"
              name="contraseña"
              value={nuevoTesorero.contraseña}
              onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
              direction="row"
              labelWidth="160px"
            />
            <TextBoxField
              textLabel="Email:"
              name="email"
              type="email"
              value={nuevoTesorero.email}
              onChange={(e) => handleChangeInput(e, setNuevoTesorero)}
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
