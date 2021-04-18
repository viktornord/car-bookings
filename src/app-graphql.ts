import { ApolloServer } from 'apollo-server';

import { bookingsController } from './controllers/bookings'
import { typeDefs } from './type-defs-graphql'

const resolvers = {
  Query: {
    bookings: (parent, args, context) => {
        const { date } = context.variables;
        return bookingsController.getBookings({ date })
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

  server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`));