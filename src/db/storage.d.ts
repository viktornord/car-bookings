export interface IStorage {
    customers: Array<ICustomer>;
    bookings: Array<IBooking>;
    vehicles: Array<IVehicle>;
}

export interface ICustomer {
    name: string;
    email: string;
    phone: string;
}

export interface INewVehicle {
    make: string;
    model: string;
}

export interface IVehicle extends INewVehicle {
    VIN: string
}

export interface INewBooking {
    customer: ICustomer;
    vehicle: INewVehicle;
}

export interface IBooking extends INewBooking {
    status: 'processing' | 'done';
    vehicle: IVehicle;
    createdAt: Date;
}
