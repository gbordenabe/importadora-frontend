import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { BlockUI } from "primereact/blockui";
import { SelectField } from "@/components/SelectField/SelectField";
import style from "./UsuariosTransaccion.module.css";
import * as Yup from "yup";
import { useGetFetch } from "@/hooks/useGetFetch";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { Message } from "primereact/message";

interface Props {
  usuarios?: any;
  setUsuarios?: any;
  sku?: any;
  isBlocked?: boolean;
  onChangeStatusGroup?: any;
}

const UsuariosTransaccionSchema = Yup.object().shape({
  empresa: Yup.object().required("La empresa es requerida"),
  cliente: Yup.object().required("El cliente es requerido"),
});

export const UsuariosTransaccion = ({
  usuarios,
  setUsuarios,
  isBlocked,
  onChangeStatusGroup,
}: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const ClienteFetch = useGetFetch("/client");
  const UserFetch = useGetFetch("/company");

  return (
    <div className={style.box__container}>
      <Formik
        initialValues={{
          empresa: usuarios?.empresa || "",
          cliente: usuarios?.cliente || "",
        }}
        validationSchema={UsuariosTransaccionSchema}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          setSubmitting(true);
          console.log("values", values);
          try {
            // setSubmitting(true);
            // const { empresa, cliente } = values;
            // const { data } = await ClienteFetch.get(`/client/${cliente}`);
            // const { data: user } = await UserFetch.get(`/company/${empresa}`);
            // setUsuarios({
            //     ...usuarios,
            //     cliente: data,
            //     empresa: user,
            // });
            // setSubmitting(false);
            onChangeStatusGroup("user");
            setUsuarios(values)
          } catch (error: any) {
            console.log(error);
            setErrors({ empresa: error.message, cliente: error.message });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className={style.box__head}>
              <h2>Usuarios</h2>
              <div>
                {isBlocked ? (
                  <SecondaryButton type="submit" text="Editar" />
                ) : (
                  <PrimaryButton type="submit" text="Confirmar" />
                )}
              </div>
            </div>

            <BlockUI
              blocked={isBlocked || submitting}
              style={{ borderRadius: "5px" }}
            >
              <div className={style.box__content}>
                <div className={style.box__content__item}>
                  <Field name="empresa">
                    {({ field }: { field: any }) => (
                      <SelectField
                        textLabel="Empresa"
                        value={field.value}
                        name={field.name}
                        options={UserFetch?.data?.data}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChangeInput(e, setUsuarios);
                        }}
                      />
                    )}
                  </Field>
                  {errors.empresa && (
                    <Message severity="error" text={`${errors.empresa}`} />
                  )}
                </div>
                <div className={style.box__content__item}>
                  <Field name="cliente">
                    {({ field }: { field: any }) => (
                      <SelectField
                        textLabel="Cliente"
                        value={field.value}
                        name={field.name}
                        options={ClienteFetch?.data?.data}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChangeInput(e, setUsuarios);
                        }}
                      />
                    )}
                  </Field>
                  {errors.cliente && (
                    //<span style={{ fontSize: '1px' }}>
                    <Message severity="error" text={`${errors.cliente}`} />
                    //</span>
                  )}
                </div>
              </div>
            </BlockUI>
          </Form>
        )}
      </Formik>
    </div>
  );
};
