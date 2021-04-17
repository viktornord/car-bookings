import { IBooking } from '../db/storage';
import { db } from '../db/db-manager';

const DEALERSHIP_HOURS = { from: 9, to: 17 };

class BookingsController {
    isBookingPossible(booking: IBooking) {
        const hours = booking.createdAt.getHours();
        if (hours < DEALERSHIP_HOURS.from || hours > DEALERSHIP_HOURS.to) {
            throw new Error(`Booking is impossible. We are working from ${DEALERSHIP_HOURS.from} AM to ${DEALERSHIP_HOURS.to % 12} PM`);
        }
        db
    }

}