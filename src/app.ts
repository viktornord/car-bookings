import { fastify } from 'fastify';
import { db } from './db/db-manager';
import { INewBooking } from './db/storage';

const server = fastify({ logger: true })

server
  .get('/bookings', async (request, reply) => {
    const { date } = request.query as { date: string};
    return db.getBookings(date);
  })
  .post('/bookings', async (request, reply) => {
    await db.addBooking(request.body as INewBooking);
    reply.status(201).send();
  })
  .post('/bookings/capacity', async (request, reply) => {
    const { capacity } = request.body as { capacity: number };
    await db.updateBookingCapacity(capacity);
    reply.status(200).send();
  });


  server.listen(3000)