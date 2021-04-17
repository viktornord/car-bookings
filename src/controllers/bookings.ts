import { INewBooking } from '../db/storage';
import { db } from '../db/db-manager';

const DEALERSHIP_HOURS = { from: 9, to: 14 };

class BookingsController {

    saveBooking(booking: INewBooking) {
        if (!this.isBookingPossible()) {
            throw new Error(`Booking is impossible. We are working from ${DEALERSHIP_HOURS.from} AM to ${DEALERSHIP_HOURS.to % 12} PM`);
        }
        db.addBooking(booking);
    }

    getBookings(day: string) {
        const date = new Date(day);
        return db.getBookings(date);
    }

    updateBookingCapacity(capacity: number) {
        db.updateBookingCapacity(capacity);
    }

    private isBookingPossible() {
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const seconds = new Date().getSeconds();

        return hours >= DEALERSHIP_HOURS.from && hours < DEALERSHIP_HOURS.to;
    }

}

export const bookingsController = new BookingsController();
