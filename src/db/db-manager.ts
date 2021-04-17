import storage from './storage.json';
import { IStorage, BOOKING_STATUS, IBooking } from './storage';

const BOOKING_PROCESSING_TIME_MS = 2 * 3600;
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

    addBooking(booking: IBooking) {
        const processingBookings = this.storage.bookings.filter((booking) => {
            if (booking.status === BOOKING_STATUS.PROCESSING) {
                if (booking.createdAt.getTime() + BOOKING_PROCESSING_TIME_MS < Date.now()) {
                    // still processing
                    return true;
                }
                // processed (better to do with a cron job)
                booking.status = BOOKING_STATUS.DONE;
            }
        });
        if (processingBookings.length < MAX_PROCESSING_BOOKINGS_CAPACITY) {
            // can accept a new booking
            booking.createdAt = new Date();
            booking.status = BOOKING_STATUS.PROCESSING;
            this.storage.bookings.push(booking)
        }
        // Better to implement a queuing (may be achieved in this case for example with a new status)
        throw new Error('We can not accept a new booking now. Please try again later.');
    }
}

export const db = new DbManager();
