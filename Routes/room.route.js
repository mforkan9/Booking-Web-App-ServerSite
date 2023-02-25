const express = require('express')
const RoomControllers = require('../Controllers/room.controllers')
const router = express.Router()

router.route('/createRoom')
    .post(RoomControllers.postCreateRoom)
    .get(RoomControllers.getListAllRoom)

router.route('/bannerRoom')
    .get(RoomControllers.getBannerDisplayRoom)

router.route('/roomFindByStatus')
    .get(RoomControllers.getRoomByStatus)

router.route('/roomFindById/:id')
    .get(RoomControllers.getRoomById)

router.route('/roomBookingDate/:id')
    .get(RoomControllers.getRoomBookingDate)

router.route('/deleteRoom/:id')
    .delete(RoomControllers.deleteCreateRoom)

router.route('/editRoom/:id')
    .patch(RoomControllers.updateRoom)
router.route('/deleteInner')
    .patch(RoomControllers.deleteInnerImg)

router.route('/checkAvailability')
    .post(RoomControllers.checkAvailablity)





module.exports = router