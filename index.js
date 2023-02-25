const express = require('express')
const app = express()
const port = 8000
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const RoomDatas = require('./Models/createRoom.model')

const RoomCreateRouter = require('./Routes/room.route')
const BookingRouter = require('./Routes/Booking.route')
const ClientRouter = require('./Routes/Client.route')
const ReviewRouter = require('./Routes/HotelReviews.route')
const HotelGalleryRouter = require('./Routes/HotelGallery.route')
const AdminRouter = require('./Routes/Admin.route')


//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


//Database
mongoose.connect(process.env.DATABASE_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName:'Booking-web'
  }).then(() =>{
  console.log('Database connected')
})


app.use('/api/v1/room',RoomCreateRouter)
app.use('/api/v1/booking',BookingRouter)
app.use('/api/v1/client',ClientRouter)
app.use('/api/v1/review',ReviewRouter)
app.use('/api/v1/hotelGallery',HotelGalleryRouter)
app.use('/api/v1/admin',AdminRouter)



app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})