export interface IStorage {
    customers: Array<ICustomer>;
    bookings: Array<IBooking>;
    vehicles: Array<IVehicle>;
}

export interface ICustomer {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface IVehicle {
    make: string;
    model: string;
}

export interface IBooking {
    status: BOOKING_STATUS;
    customerId: number;
    vehicle: IVehicle & { VIN: string };
    createdAt: Date;
}

export enum BOOKING_STATUS {
    PROCESSING = 'processing',
    DONE = 'done',
}