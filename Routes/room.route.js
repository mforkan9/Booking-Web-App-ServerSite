const express = require('express')
const RoomControllers = require('../Controllers/room.controllers')
const router = express.Router()

router.route('/createRoom')
.post(RoomControllers.postCreateRoom)
.get(RoomControllers.getAllCreateRoom)


router.route('/deleteRoom/:id')
 .delete(RoomControllers.deleteCreateRoom)





module.exports = router