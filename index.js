import express from 'express'
const app = express()
const port = process.env.PORT || 8000
import { urlencoded, json } from 'body-parser'
import cors from 'cors'
require('dotenv').config()
import { connect } from 'mongoose'

import RoomCreateRouter from './Routes/room.route'
import BookingRouter from './Routes/Booking.route'
import ClientRouter from './Routes/Client.route'
import ReviewRouter from './Routes/HotelReviews.route'
import HotelGalleryRouter from './Routes/HotelGallery.route'
import AdminRouter from './Routes/Admin.route'


//Middleware
app.use(urlencoded({ extended: false }))
app.use(json())
app.use(cors())


//Database
connect(process.env.DATABASE_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName:'Booking-web'
  }).then(() =>{
  console.log('Database connected')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api/v1/room',RoomCreateRouter)
app.use('/api/v1/booking',BookingRouter)
app.use('/api/v1/client',ClientRouter)
app.use('/api/v1/review',ReviewRouter)
app.use('/api/v1/hotelGallery',HotelGalleryRouter)
app.use('/api/v1/admin',AdminRouter)





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})