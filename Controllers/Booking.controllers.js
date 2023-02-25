const Booking = require('../Models/Booking.model')
const Client = require('../Models/Client.model')
const RoomDatas = require('../Models/createRoom.model')


exports.postBooking = async (req, res) => {
  try {
    const bookdata = req.body

    const date3 = new Date(bookdata.checkIn)
    const date4 = new Date(bookdata.checkOut)

    const client = await Client.findOne({ email: bookdata.email })
    if (!client) {
      await Client.create({ userName: bookdata.firstName, email: bookdata.email, contactNumber: bookdata.contactNumber })
    }


    const data = await RoomDatas.findById({ _id: bookdata.bookedFor }).select({ reserved: 1 })

    let checkedData;
    await data.reserved.forEach(element => {
      let from = element.checkIn
      let to = element.checkOut
      const date1 = new Date(from)
      const date2 = new Date(to)
      if (date3.getTime() <= date2.getTime() && date3.getTime() >= date1.getTime()) {
        return checkedData = true
      }
    });


    const checkData = await data.reserved.some(item => JSON.stringify(item.checkOut) === JSON.stringify(bookdata.checkOut))
    if (checkedData || checkData) {
      return res.status(400).json({
        status: 'fail',
        error: { message: 'Room already booked,Please choose another One' },
        book: data
      })
    }

    const greaterThan = date3.getTime() < date4.getTime()
    if (!greaterThan) {
      return res.status(400).json({
        status: 'fail',
        error: { message: ' CheckIN greater than CheckOut' }
      })
    }


    const result = await Booking.create(bookdata)
    const { _id: bookedId, email, bookedFor, checkIn, checkOut } = result



    if (new Date() < new Date(checkIn)) {
      await Booking.findByIdAndUpdate({ _id: bookedId }, { $set: { status: 'pending' } })
    } else {
      await Booking.findByIdAndUpdate({ _id: bookedId }, { $set: { status: 'approved' } })
    }


    await Client.findOneAndUpdate({ email: email }, { $push: { bookedId,activity: {text:'New room booked', date:new Date()}} }, { runValidators: true, new: true })
    await RoomDatas.findByIdAndUpdate({ _id: bookedFor }, { $push: { reserved: { checkIn: checkIn, checkOut: checkOut, bookedInfo: bookedId } } }, { runValidators: true, new: true })



    res.status(200).json({
      status: 'success',
      message: 'Room booking Successfull',
      result: result
    })

  }
  catch (error) {
    res.status(404).json({
      status: 'fail',
      error: error
    })
  }

}

exports.getAllbookings = async (req, res) => {
  try {
    const { page, limit,filter } = req.query
    const limitData = parseInt(limit)
    const skipData = (page - 1) * limitData
    const bookings = await Booking.find({firstName:new RegExp(filter, 'i')}).populate('bookedFor')
      .limit(limitData)
      .skip(skipData)
      .sort({ createdAt: -1 })


    for (const item of bookings) {
      if (new Date() > new Date(item.checkIn)) {
        await Booking.updateOne({ _id: item._id }, { $set: { status: 'approved' } }, { runValidators: true, new: true })
      }
    }

    const totalData = await Booking.count()
    res.status(200).json({
      status: 'success',
      data: bookings,
      totalData
    })
  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error,
      message: 'couldnt find data'
    })
  }
}

exports.getBookingFindById = async (req, res) => {
  try {
    const id = req.params.id
    const booking = await Booking.findById({ _id: id }).populate('bookedFor')

    res.status(200).json({
      status: 'success',
      data: booking
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error
    })
  }
}

exports.caneleBooking = async (req, res) => {
  try {
    const bookingId = req.params.id
  
    const result = await Booking.findByIdAndUpdate({ _id: bookingId }, { $set: { status: 'canceled' } }, { runValidators: true, new: true })

    await RoomDatas.updateOne({ _id: req.body.roomId }, { $pull: { reserved: { bookedInfo: bookingId } } }, { upsert: false })

 

    res.status(200).json({
      status: 'success',
      result: result
    })

  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}

exports.getStatusBooking = async (req, res) => {
  try {
    const { status, page, limit } = req.query
    const limitData = parseInt(limit)
    const skipData = (page - 1) * limitData
    const data = await Booking.find({ status: status }).populate('bookedFor')
      .limit(limitData)
      .skip(skipData)
      .sort({ createdAt: -1 })


    const totalData = await Booking.find({ status: status }).count()
    res.status(200).json({
      status: 'success',
      result: data,
      totalData
    })

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error
    })
  }
}

exports.deleteBooking = async(req,res) =>{
  try {
    const id = req.params.id

    const result = await Booking.deleteOne({_id:id})

    res.status(200).json({
      status:'success',
      result:result
    })
  } catch (error) {
    res.status(400).json({
      status:'fail',
      error
    })
  }
}

exports.getBookingByMonth = async(req,res) =>{
  try {
    const year = new Date().getFullYear()
    const data = await Booking.find({ $expr: {
      $eq: [{ $year: "$createdAt" }, year]
      }});


    res.status(200).json({
      status:'success',
      data:data
    })
  } 
  catch (error) {
      res.status(400).json({
        status:'fail',
        error
      })
  }
}