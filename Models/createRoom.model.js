const mongoose = require('mongoose')

const RoomCreateSchema = mongoose.Schema({
    roomNumber:{
        type:Number,
        required:true,
        unique: true
    },
    roomType:{
        type:String,
        required:true
    },
    roomFeature:{
        type:String,
        required:true
    },
    roomMeal:{
        type:String,
        required:true
    },
    roomCancelCharge:{
        type:String,
        required:true
    },
    roomBedCapacity:{
        type:Number,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    ratePerNight:{
        type:String,
        required:true
    },
    roomDetails:{
        type:String,
        required:true
    },
    roomImage:{
        type:String,
        required:[true,'Image is required....please upload image']
    }
   
})

const AddRoom = mongoose.model('RoomDatas',RoomCreateSchema)

module.exports = AddRoom