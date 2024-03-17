import style from "./FacturaTransaccion.module.css";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { BlockUI } from "primereact/blockui";
import { SecondaryButton } from "@/components/SecondaryButton/SecondaryButton";
import { useFormik } from "formik";
import { useState } from "react";
import { validationSchema } from "@/hooks/customFormik";
import { NuevoRegistro } from "../components/NuevoRegistro/NuevoRegistro";
import { FacturaLayout } from "./layouts/FacturaLayout/FacturaLayout";
import { facturasStructure } from "../data/data";

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
  setFacturas,
  isBlocked,
  onChangeStatusGroup,
  setTotalAmount,
}: Props) => {
  const [section, setSection] = useState<string>('');

  const initialValues: any = {
		bills: []
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			// console.log(values);
     
      await setFacturas(values)
      onChangeStatusGroup("facturas")
		},
	});

  const handleChange = (event: { target: { name: any; value: any; }; }, index: any, section: string) => {
		const { name, value } = event.target;
		const sectionValues = formik.values[section];
		const updatedSectionValues = [...sectionValues];
		updatedSectionValues[index][name] = value;
		formik.setFieldValue(section, updatedSectionValues);
	};

	const handleAdd = (section: string, newData: any) => {
		console.log('section', section, "newData", newData);
		const newValues = { ...formik.values };
		const currentValues = [...formik.values[section]];
		currentValues.push(newData);
		newValues[section] = currentValues;
		formik.setValues(newValues);
	};

	const handleRemove = (index: number, section: string) => {
		const updatedValues = [...formik.values[section]];
		updatedValues.splice(index, 1);
		formik.setFieldValue(section, updatedValues);
	};

	console.log('valuesActualizado2', formik.values);

  return (
    <form onSubmit={formik.handleSubmit}>
    <div className={style.box__container}>
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
            <BlockUI blocked={isBlocked} style={{ borderRadius: "5px" }}>
					<div style={{ display: "grid", gap: "10px" }}>

						<div className={style.box__content}>
							{Object.keys(formik.values).map((sectionKey) => (
								formik.values[sectionKey].map((pago: any, index: number) => (
									<div key={index}>
											<FacturaLayout
												section="bills"
												values={pago}
												handleChange={handleChange}
												handleRemove={handleRemove}
												errors={formik.errors.bills}
												index={index}
											/>
									</div>
								))
							))}
						</div>

						<NuevoRegistro
							addNewRegister={handleAdd}
							dataStructure={facturasStructure}
              addButtonText="+ Nueva Factura o Débito"
							listOptions={[]}
							listTitle="Factura"
							data={formik.values}
							setTotalAmount={setTotalAmount}
							section={section}
							setSection={setSection}
						/>
					</div>
				</BlockUI>
        </div>
    </form>
  );
};
