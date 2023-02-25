const mongoose = require('mongoose')



const HotelGallerySchema = mongoose.Schema({
    photoUrl: {
        type: String,
        required: true
    }
})

const HotelGallery = mongoose.model('HotelGallery',HotelGallerySchema)

module.exports = HotelGallery