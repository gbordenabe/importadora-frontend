import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    companyId: Yup.object().required("La empresa es requerida"),
    clientId: Yup.object().required("El cliente es requerido"),
    bills: Yup.array().of(
            Yup.object().shape({
            number: Yup.string()
                .required("El número es requerido")
            .test('is-unique', 'El N° de factura ya existe', function(value) {
                const { path, createError } = this;
                const formValues: any = this.options.context;
                const bills: any = formValues.bills || [];
                const filter = bills.filter((bill: any) => bill.number == value).length;
                if(filter > 1) {
                    throw createError({ path, message: 'El N° de factura ya existe' });
                }
                return true;
            }),
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