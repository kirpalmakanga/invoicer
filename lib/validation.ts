import { array, number, object, string, mixed, type InferType } from 'yup';

const invoiceItemSchema = object({
    description: string().required(),
    quantity: number().integer().positive().required(),
    pricePerUnit: number().positive().required(),
    unit: string<InvoiceItemUnit>().required(),
});

export const invoiceSchema = object({
    customerId: string().uuid().required(),
    reference: string().required(),
    paymentMethod: mixed<PaymentMethod>().required(),
    status: mixed<InvoiceStatus>().required(),
    items: array().of(invoiceItemSchema).min(1).required(),
    datePaid: string().nullable().default(null),
});

export type InvoiceSchema = InferType<typeof invoiceSchema>;
