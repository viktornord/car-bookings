import * as storage from './storage.json';
import { IStorage, IBooking, INewBooking } from './storage';
import { Booking, BOOKING_STATUS } from './models/booking';

const BOOKING_PROCESSING_TIME_MS = 2 * 3600 * 1000;
// can be changed
let MAX_PROCESSING_BOOKINGS_CAPACITY = 2;

class DbManager {
    storage: IStorage;

    constructor() {
        // init new db (init state of the storage)
        this.storage = JSON.parse(JSON.stringify(storage));
    }

    updateBookingCapacity(capacity: number) {
        MAX_PROCESSING_BOOKINGS_CAPACITY = capacity;
    }

    addBooking(newBooking: INewBooking): Booking {
        const processingBookings = this.storage.bookings.filter((booking) => {
            if (booking.status === BOOKING_STATUS.PROCESSING) {
                if (Date.now() - booking.createdAt.getTime() < BOOKING_PROCESSING_TIME_MS) {
                    // still processing
                    return true;
                }
                // processed (better to do with a cron job)
                booking.status = BOOKING_STATUS.DONE;
            }
        });
        if (processingBookings.length == MAX_PROCESSING_BOOKINGS_CAPACITY) {
            // Better to implement a queuing (may be achieved in this case for example with a new status)
            throw new Error('We can not accept a new booking now. Please try again later.');
        }
        // can accept a new booking
        const savedBooking = new Booking(newBooking);
        this.storage.bookings.push(savedBooking);

        return savedBooking;
    }

    getBookings(date: Date): IBooking[] {
        if (!date) {
            return this.storage.bookings; // return all bookings
        }
        const day = date.toLocaleDateString();

        return this.storage.bookings.filter((booking) => booking.createdAt.toLocaleDateString() === day);
    }
}

export const db = new DbManager();
