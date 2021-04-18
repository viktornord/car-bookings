import { INewBooking } from '../db/storage';
import { db } from '../db/db-manager';

const DEALERSHIP_HOURS = { from: 9, to: 14 };

class BookingsController {

    async saveBooking({ booking }: { booking: INewBooking }) {
        if (!this.isBookingPossible()) {
            throw new Error(`Booking is impossible. We are working from ${DEALERSHIP_HOURS.from} AM to ${DEALERSHIP_HOURS.to % 12} PM`);
        }
        return db.addBooking(booking as INewBooking);
    }
    
    async getBookings({ date, vehicleVIN }: { date: string, vehicleVIN: string }) {
        return db.getBookings({
            date: date && new Date(date),
            vehicleVIN,
        });
    }

    async updateBookingCapacity({ capacity }: { capacity: number }) {
        await db.updateBookingCapacity(capacity);

        return { capacity };
    }

    private isBookingPossible() {
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const seconds = new Date().getSeconds();

        return hours >= DEALERSHIP_HOURS.from && hours < DEALERSHIP_HOURS.to;
    }

}

export const bookingsController = new BookingsController();
