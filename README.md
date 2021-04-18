# Setup
1. `cd` to a repositry foler
2. Install dependencies with `npm install`
3. Copy environment variables example file `cp .env.example .env`
4. specify values for your local run in `.env`

# HTTP Server
## Run
> npm start:http

## API
note: substitue `PORT` with `HTTP_SERVER_PORT` from your `.env` file 
## Update bookings capacity
note: by default booking capacity is 2
```bash
curl -i -X POST -H "Content-Type: application/json" -d '{"customer": {"capacity":3}'  http://localhost:PORT/bookings/capacity
```
## Get bookings by date
```bash
curl -i -X GET  http://localhost:PORT/bookings?date=04/17/2021
```
## Add a new booking
```bash
curl -i -X POST -H "Content-Type: application/json" -d '{"customer": {"name":"Viktor", "email": "test@test.com", "phone": "+380971111111"}, "vehicle": {"make": "Suzuki", "model": "SX4"}}'  http://localhost:3000/bookings
```


# GraphQL server
## Run
> npm start

Navigate to the url printed in the output (http://localhost:PORT)
note: substitue `PORT` with `GRAPHQL_SERVER_PORT` from your `.env` file 

## API
Notice the "Schema" and "Docs" labels in the right side. There you can find schema definition and queries / mutations you can perform.

## Update bookings capacity (by default booking capacity is 2)
Mutation
```graphql
mutation updateBookingCapacity($capacity: Int!) {
  updateBookingCapacity(capacity: $capacity) {
    capacity
  }
}
```
Variables
```json
{
  "capacity": 3
}
```
## Get bookings by date
```graphql
{
  bookings {
    customer {
      name
    }
    status
  }
}
```
Variables [OPTIONAL]
```json
{
  "date": "04/18/21"
}
```
note: if `date` variable is not provided - all bookings will be returned
## Add a new booking
```graphql
mutation addBooking($booking: NewBooking!) {
  addBooking(booking: $booking) {
    customer {
      name
    }
  }
}
```
Variables
```json
{
  "booking": {
    "customer": {
      "name": "Viktor",
      "phone": "+380971111111",
      "email": "test@test.com"
    },
    "vehicle": {
      "make": "Suzuki",
      "model": "SX4"
    }
  }
}
```

# Tests
## Run
> npm test

notice: tests are to be added (for now only [`src/db/models/booking.ts`](src/db/models/booking.ts) is covered)