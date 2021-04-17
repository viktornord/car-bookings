import { IBooking, ICustomer, IVehicle } from './storage';
import { Vehicle } from './vehicle';

export enum BOOKING_STATUS {
    PROCESSING = 'processing',
    DONE = 'done',
}

export class Booking implements IBooking {
    status: BOOKING_STATUS;
    customer: ICustomer;
    vehicle: IVehicle;
    createdAt: Date;
    
    constructor(data) {
        Object.assign(this, data);
        this.createdAt = new Date();
        this.status = BOOKING_STATUS.PROCESSING;
        this.vehicle = new Vehicle(data.vehicle);
    }
}
