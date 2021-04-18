import { fastify } from 'fastify';
import { INewBooking } from './db/storage'
import { bookingsController } from './controllers/bookings';

const server = fastify({ logger: true })

server
  .get('/bookings', (request) => {
    const { date } = request.query as { date: string};
    return bookingsController.getBookings({ date })
  })
  .post('/bookings', async (request, reply) => {
    const booking = request.body as INewBooking;
    const savedBooking = await bookingsController.saveBooking({ booking });
    reply.status(201).send(savedBooking);
  })
  .post('/bookings/capacity', (request) => {
    const { capacity } = request.body as { capacity: number };
    return bookingsController.updateBookingCapacity({ capacity });
  });


  server.listen(3000);