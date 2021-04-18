import { gql } from 'apollo-server';

export const typeDefs = gql`
input NewBooking {
  customer: NewCustomer
  vehicle: NewVehicle
}
input NewVehicle {
  make: String
  model: String
}
input NewCustomer {
  name: String
  email: String
  phone: String
}

type Capacity {
    capacity: Int
}
type Booking {
  customer: Customer
  status: String
  vehicle: Vehicle
  createdAt: String
}
type Customer {
  name: String
  email: String
  phone: String
}
type  Vehicle {
  make: String
  model: String
  VIN: String
}

type Query {
  bookings: [Booking]
}

type Mutation {
  updateBookingCapacity(capacity: Int!): Capacity
  addBooking(booking: NewBooking!): Booking
}
`;
