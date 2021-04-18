import { Booking, BOOKING_STATUS } from './booking';
import { Vehicle } from './vehicle';

describe('Booking status', () => {
    it('should have "processing" status defined', () => {
        expect(BOOKING_STATUS.PROCESSING).toBe('processing');
    });

    it('should have "done" status defined', () => {
        expect(BOOKING_STATUS.DONE).toBe('done');
    });
});

describe('Booking db model', () => {
    it('should init all props passed to the constructor', () => {
        const bookingData = { foo: 'bar', baz: 'bam' };
        const booking = new Booking(<any>bookingData);

        expect(booking['foo']).toBe('bar');
        expect(booking['baz']).toBe('bam');
    });

    it('should init "createdAt" and "status" for a new booking', () => {
        const booking = new Booking(<any>{ createdAt: 'foo', status: 'bar' });
        expect(booking.createdAt).toBeInstanceOf(Date);
        expect(booking.createdAt.toString()).toBe(new Date().toString());
        expect(booking.status).toBe(BOOKING_STATUS.PROCESSING);
    });

    it('should init vehicle', () => {
        const booking = new Booking(<any>{});
        expect(booking.vehicle).toBeInstanceOf(Vehicle);
    });
});