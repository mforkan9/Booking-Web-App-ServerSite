const express = require('express')
const router = express.Router()
const AdminControllers = require('../Controllers/Admin.controllers')

router.route('/addUser')
  .post(AdminControllers.addUser)

router.route('/findUser')
 .post(AdminControllers.adminAuth)

 router.route('/getAllUser')
 .get(AdminControllers.getAllUser)



module.exports = router