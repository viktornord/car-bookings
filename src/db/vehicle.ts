import { randomBytes } from 'crypto';
import { IVehicle } from './storage';

export class Vehicle implements IVehicle {
    make: string;
    model: string;
    VIN: string;

    constructor(data) {
        Object.assign(this, data);
        this.VIN = randomBytes(9).toString('hex').substring(0, 17);
    }
}
