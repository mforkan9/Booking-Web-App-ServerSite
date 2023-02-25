const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const RoomCreateSchema = mongoose.Schema({
    roomNumber: {
        type: Number,
        required: true,
        unique: true
    },
    roomType: {
        type: String,
        required: true
    },
    roomFeature: {
        type: String,
        required: true
    },
    roomMeal: {
        type: String,
        required: true
    },
    roomCancelCharge: {
        type: String,
        required: true
    },
    roomBedCapacity: {
        type: Number,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    ratePerNight: {
        type: Number,
        required: true,
        min: 0
    },
    roomDetails: {
        type: String,
        required: true
    },
    roomImage: {
        type: String,
        required: [true, 'Image is required....please upload image']
    },
    roomInnerImage:{
        type: [String], 
        validate: v => Array.isArray(v) && v.length > 1 ,
        validate:v => v.length <= 4
    },
    reserved:[{
        checkIn:String,
        checkOut:String,
        bookedInfo:{
            type:ObjectId,
            ref:'Booking'
        }
    }],
    status:{
        type:String,
        enum:['Active','Booked']
    }

},
    {
        timestamps: true
    }
)

const RoomDatas = mongoose.model('RoomDatas', RoomCreateSchema)

module.exports = RoomDatas;