import { config } from 'dotenv';
import { ApolloServer } from 'apollo-server';

import { bookingsController } from './controllers/bookings'
import { typeDefs } from './type-defs-graphql'

config();

const { GRAPHQL_SERVER_PORT } = process.env;

const resolvers = {
  Query: {
    bookings: (parent, args, context) => {
        const { date, vehicleVIN } = context.variables;
        console.log(context.variables);
        return bookingsController.getBookings({ date, vehicleVIN })
    },
  },
  Mutation: {
    addBooking(parent, args, context) {
      const { booking } = context.variables;
      return bookingsController.saveBooking({ booking });
    },
    updateBookingCapacity(parent, args, context) {
      const { capacity } = context.variables;
      return bookingsController.updateBookingCapacity({ capacity });
    }
  }
};

  const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({...req.body }) });

  server.listen(GRAPHQL_SERVER_PORT).then(({ url }) => console.log(`🚀  Server ready at ${url}`));