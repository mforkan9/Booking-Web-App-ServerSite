const express = require('express')
const router = express.Router()
const BookingControllers = require('../Controllers/Booking.controllers')

router.route('/createBooking')
    .post(BookingControllers.postBooking)

router.route('/allBooking')
    .get(BookingControllers.getAllbookings)

router.route('/statusBooking')
    .get(BookingControllers.getStatusBooking)
    
router.route('/bookingFindById/:id')
    .get(BookingControllers.getBookingFindById)

router.route('/cancelBooking/:id')
  .patch(BookingControllers.caneleBooking)

router.route('/deleteBooking/:id')
  .delete(BookingControllers.deleteBooking)

router.route('/bookingFindByMonth')
  .get(BookingControllers.getBookingByMonth)



module.exports = router