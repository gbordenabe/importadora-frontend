import style from "./FacturaTransaccion.module.css";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { BlockUI } from "primereact/blockui";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import CalendarInput from "@/components/Calendar/Calendar";
import { MoneyBoxField } from "@/components/MoneyBoxField/MoneyBoxField";
import { Message } from "primereact/message";
import { useState } from "react";
import { ChipText } from "@/components/ChipText/ChipText";
import styleNuevoRegistro from "../components/NuevoRegistro/NuevoRegistro.module.css";
import { formatPrice } from "@/helpers/formatPrice";
import styleFacturaLayout from "./layouts/FacturaLayout/FacturaLayout.module.css";
import { MaximizarButton } from "../components/MaximizarButton/MaximizarButton";
import { DeleteButton } from "../components/DeleteButton/DeleteButton";
import { MinimziarButton } from "../components/MinimizarButton/MinimizarButton";

export interface IFacturas {
  number: string;
  amount: number;
  date: string;
  observation: string;
}

interface Props {
  facturas?: IFacturas[];
  setFacturas?: any;
  isBlocked?: boolean;
  onChangeStatusGroup?: any;
  setTotalAmount?: any;
  eliminarFactura?: any;
}

export const FacturaTransaccion = ({
  // facturas,
  setFacturas,
  isBlocked,
  onChangeStatusGroup,
  setTotalAmount,
  // eliminarFactura,
}: Props) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});
  const [showAddButton, setShowAddButton] = useState(false);

  const validationSchema = Yup.object().shape({
    bills: Yup.array().of(
      Yup.object().shape({
        number: Yup.string().required("El número es requerido"),
        amount: Yup.number().required("El monto es requerido"),
        date: Yup.string().required("La fecha es requerida"),
        observation: Yup.string(),
      })
    ),
  });

  const getErrorMessage = (fieldName: string, index: number) => (
    <ErrorMessage name={`bills.${index}.${fieldName}`}>
      {(errorMessage) => (
        <Message
          severity="error"
          text={errorMessage}
          style={{ fontSize: "0.1rem" }}
        />
      )}
    </ErrorMessage>
  );

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const calculateTotal = (values: any) => {
    const totalValue = values.reduce(
      (total: number, bill: { amount: string }) =>
        total + (parseFloat(bill.amount) || 0),
      0
    );
    return totalValue;
  };
  return (
    <div className={style.box__container}>
      <Formik
        initialValues={{
          bills: [{ number: "", amount: "", date: "", observation: "" }],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await onChangeStatusGroup("facturas");
          const totalAmount = values.bills.reduce(
            (total, bill) => total + (parseFloat(bill.amount) || 0),
            0
          );
          setFacturas(values.bills);
          setTotalAmount(totalAmount);
        }}
      >
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className={style.box__head}>
              <h2> Factura o nota de débito </h2>
              <div>
                {isBlocked ? (
                  <SecondaryButton
                    text="Editar"
                    type="submit"
                  />
                ) : (
                  <PrimaryButton
                    text="Confirmar"
                    type="submit"
                  />
                )}
              </div>
            </div>
            <FieldArray name="bills">
              {({ push, remove }) => (
                <BlockUI blocked={isBlocked} style={{ borderRadius: "5px" }}>
                  <div className={style.box__content}>
                    {showAddButton && (
                      values.bills.map((_, index) => (
                        <div>
                          {expandedItems[index] ? (
                            <div className={styleFacturaLayout.layout__header}>
                              <div className={styleFacturaLayout.layout__header__group}>
                                <p className={styleFacturaLayout.layout__header__title}>
                                  Factura
                                </p>
                                <ChipText text={`N°: ${_.amount || "-"}`} />
                                <ChipText text={`Monto: ${formatPrice(parseFloat(_.amount) || 0 )}`} />
                              </div>
                              <div className={styleFacturaLayout.layout__header__group}>
                              <MaximizarButton onClick={() => toggleExpanded(index)} />
                              <DeleteButton onClick={()=>remove(index)} />
                                </div>
                            </div>
                          ) : (
                            <>
                            <div className={styleFacturaLayout.layout__header}>
                              <div className={styleFacturaLayout.layout__header__group}>
                                <p className={styleFacturaLayout.layout__header__title}>
                                  Factura
                                </p>
                              </div>
                              <div className={styleFacturaLayout.layout__header__group}>
                              <MinimziarButton onClick={() => toggleExpanded(index)} />
                              <DeleteButton onClick={()=>remove(index)} />
                                </div>
                            </div>
                              <div key={index} className={style.inline_fields}>
                                <div className={style.field}>
                                  <Field
                                    name={`bills.${index}.number`}
                                    as={TextBoxField}
                                    error={getErrorMessage("number", index)}
                                  />
                                </div>
                                <div className={style.field}>
                                  <Field
                                    name={`bills.${index}.amount`}
                                    as={MoneyBoxField}
                                    error={getErrorMessage("amount", index)}
                                  />
                                </div>
                                <div className={style.field}>
                                  <Field
                                    name={`bills.${index}.date`}
                                    as={CalendarInput}
                                    error={getErrorMessage("date", index)}
                                  />
                                </div>
                              </div>
                              <div className={style.field}>
                                <Field
                                  name={`bills.${index}.observation`}
                                  as={TextBoxField}
                                  error={getErrorMessage("observation", index)}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    )}
                    
                  </div>
                  <div className={styleNuevoRegistro.nuevoRegistro__container}>
                    <button
                      className={styleNuevoRegistro.button_add_bill}
                      type="button"
                      onClick={() => {
                        setShowAddButton(true),
                        push({
                          number: "",
                          amount: "",
                          date: "",
                          observation: "",
                        })
                      }}
                    >
                      + Agregar factura
                    </button>
                    <div className={styleNuevoRegistro.nuevoRegistro__total}>
                      <p
                        className={
                          styleNuevoRegistro.nuevoRegistro__total__text
                        }
                      >
                        Total:{" "}
                      </p>
                      <p className={style.nuevoRegistro__total__text}>
                        {formatPrice(calculateTotal(values.bills))}
                      </p>
                    </div>
                  </div>
                </BlockUI>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
};
