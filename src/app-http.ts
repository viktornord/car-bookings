import { config } from 'dotenv';
import { fastify } from 'fastify';
import { INewBooking } from './db/storage'
import { bookingsController } from './controllers/bookings';

config();

const { HTTP_SERVER_PORT } = process.env;

const server = fastify({ logger: true })

server
  .get('/bookings', (request) => {
    const { date, vehicleVIN } = request.query as { date: string, vehicleVIN: string };
    return bookingsController.getBookings({ date, vehicleVIN })
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


  server.listen(HTTP_SERVER_PORT, () => console.log(`🚀  Server ready at http://localhost:${HTTP_SERVER_PORT}`));