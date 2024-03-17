import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    bills: Yup.array().of(
            Yup.object().shape({
            number: Yup.string().required("El número es requerido"),
            amount: Yup.number().required("El monto es requerido"),
            date: Yup.string().required("La fecha es requerida"),
            observation: Yup.string(),
            })
        ),
    checks: Yup.array().of(
            Yup.object().shape({
                document_number: Yup.string().required("El N° de cheque es requerido"),
                amount: Yup.number()
                    .required("El monto es requerido")
                    .positive("El monto debe ser mayor que cero"),
                date: Yup.string().required("La fecha es requerida"),
                observation: Yup.string(),
                type: Yup.string(),
                bank_name: Yup.string(),
                file_field_name: Yup.string()
            })
        ),
    deposits: Yup.array().of(
        Yup.object().shape({
            document_number: Yup.string().required("El N° es requerido"),
            amount: Yup.number()
                .required("El monto es requerido")
                .positive("El monto debe ser mayor que cero"),
            date: Yup.string().required("La fecha es requerida"),
            observation: Yup.string(),
            bank_name: Yup.string(),
            file_field_name: Yup.string().required(
                "El archivo adjunto es requerido"
            ),
        })
    ),
    cash: Yup.array().of(
        Yup.object().shape({
            document_number: Yup.string().required("El N° es requerido"),
            amount: Yup.number()
                .required("El monto es requerido")
                .positive("El monto debe ser mayor que cero"),
            date: Yup.string().required("La fecha es requerida"),
            observation: Yup.string(),
            file_field_name: Yup.string(),
        })
    ),
    credits: Yup.array().of(
        Yup.object().shape({
            amount: Yup.number()
                .required("El monto es requerido")
                .positive("El monto debe ser mayor que cero"),
            date: Yup.string().required("La fecha es requerida"),
            observation: Yup.string(),
        })
    ),
    credit_notes: Yup.array().of(
        Yup.object().shape({
            amount: Yup.number()
                .required("El monto es requerido")
                .positive("El monto debe ser mayor que cero"),
            date: Yup.string().required("La fecha es requerida"),
            observation: Yup.string(),
        })
    ),
    retentions: Yup.array().of(
        Yup.object().shape({
            amount: Yup.number()
                .required("El monto es requerido")
                .positive("El monto debe ser mayor que cero"),
            date: Yup.string().required("La fecha es requerida"),
            observation: Yup.string(),
            file_field_name: Yup.string().required(
                "El archivo adjunto es requerido"
            ),
        })
    )

})

interface IChecks {
    document_number: string;
    amount: number;
    date: string;
    observation: string;
    type: string;
    bank_name: string;
    file_field_name: string;
}

interface IDeposits {
    document_number: string;
    amount: number;
    date: string;
    observation: string;
    bank_name: string;
    file_field_name: string;
}

interface ICash {
    document_number: string;
    amount: number;
    date: string;
    observation: string;
    file_field_name: string;
}

export interface IPagos {
    checks: IChecks[];
    deposits: IDeposits[];
    cash: ICash[];
}

// interface ICustomFormik {
//     initialValues: IPagos;
//     validationSchema: typeof ValidationSchema;
//     handleSubmit: (values: IPagos) => void;
// }

// export const useCustomFormik = (
//     initialValues: IPagos,
//     validationSchema: any,
//     handleSubmit: (values: IPagos) => void
// ): ICustomFormik => {
//     const formikProps = useFormik({
//         initialValues: initialValues,
//         validationSchema: validationSchema,
//         onSubmit: handleSubmit,
//     });

//     return {
//         initialValues: formikProps.initialValues,
//         validationSchema: validationSchema,
//         handleSubmit: handleSubmit,
//     };
// };
