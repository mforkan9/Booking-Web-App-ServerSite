const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const ClientSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
        lowercase:true,
        trim:true,
        maxLength:[20,'max 20 characters']
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contactNumber:{
        type:Number,
    },
    country:{
        type:String,
        trim:true,
    },
    address:{
        type:String,
        trim:true
    },
    bookedId:[{
        type:ObjectId,
        ref:'Booking'
    }],
    activity:[{
        text:String,
        date:Date
    }]
})

const Client = mongoose.model('Client',ClientSchema)

module.exports = Client