import { ObjectId } from "mongodb";

export type officeWorker = {
    _id: ObjectId,
    full_name: string,
    address: address,
    phone: string,
    home_phone?: string,
    position: position,
    personal_id: string,
    start_date:Date,
    password: string
}

export type address = {
    city: string,
    street: string,
    number: number,
    zip_code?: number
}

export type position = 'Accountant' | 'Accounts Manager' | 'Payroll Accountant' | 'Intern' | 'Clerk';

