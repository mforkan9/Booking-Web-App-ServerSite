const express = require('express')
const router = express.Router()
const ClienControllers = require('../Controllers/Client.controllers')
const VerifyToken = require('../Utilis/VerifyToken')


router.route('/allClient')
  .get(ClienControllers.getAllUser)

router.route('/findUserByToken/:email')
  .get(VerifyToken, ClienControllers.getFindUserByToken)


router.route('/clientFindByEmail/:email')
  .get(ClienControllers.getFindUserByEmail)


router.route('/deleteClient/:id')
  .delete(ClienControllers.deleteClient)

router.route('/createUser/:email')
  .put(ClienControllers.createUser)

router.route('/profileUpdate/:email')
  .patch(VerifyToken, ClienControllers.userUpdate)







module.exports = router