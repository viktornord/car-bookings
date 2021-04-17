import { fastify } from 'fastify';
import { INewBooking } from './db/storage'
import { bookingsController } from './controllers/bookings';

const server = fastify({ logger: true })

server
  .get('/bookings', async (request, reply) => {
    const { date } = request.query as { date: string};
    return bookingsController.getBookings(date);
  })
  .post('/bookings', async (request, reply) => {
    await bookingsController.saveBooking(request.body as INewBooking);
    reply.status(201).send();
  })
  .post('/bookings/capacity', async (request, reply) => {
    const { capacity } = request.body as { capacity: number };
    await bookingsController.updateBookingCapacity(capacity);
    reply.status(200).send();
  });


  server.listen(3000)