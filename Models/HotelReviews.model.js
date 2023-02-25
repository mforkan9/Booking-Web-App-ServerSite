const mongoose = require('mongoose')


const HotelReviewsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['published','deleted']
    }
},{
    timestamps:true
})

const HotelReviews = mongoose.model('HotelReviews',HotelReviewsSchema)

module.exports = HotelReviews