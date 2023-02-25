const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const BookingSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        lowercase:true,
        trim:true,
        maxLength:[20,'max 20 characters']
    },
    lastName:{
        type: String,
        required: true,
        lowercase:true,
        trim:true,
        maxLength:[10,'max 10 characters']
    },
    email:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true,
        min:0
    },
    checkIn:{
        type:String,
        required:true
    },
    checkOut:{
        type: String,
        required:true
    },
    adult:{
        type:Number,
        required:true,
        min:0
    },
    children:{
        type:Number,
        min:0
    },
    infants:{
        type:Number,
        min:0
    },
    message:{
        type:String,
        maxLength:50
    },
    roomTotalPrice:{
        type:Number
    },
    days:{
        type:Number
    },
    status:{
        type:String,
        enum:['pending','approved','canceled'],
    },
    bookedFor:{
        type:ObjectId,
        ref:'RoomDatas',
        required:true
    }
},{
    timestamps:true
})

const Booking = mongoose.model('Booking',BookingSchema)

module.exports = Booking;