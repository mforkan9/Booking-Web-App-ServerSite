const express = require('express')
const router = express.Router()
const HotelGalleryController = require('../Controllers/HotelGallery.controller')

router.route('/imagekitAuth')
 .get(HotelGalleryController.getImagekitAuth)

router.route('/uploadImage')
 .post(HotelGalleryController.uploadImage)

router.route('/getAllImage')
 .get(HotelGalleryController.getAllImage)

router.route('/deleteGalleryImage/:id')
 .delete(HotelGalleryController.deleteGalleryImage)




module.exports = router