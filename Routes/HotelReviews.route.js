const express = require('express')
const router = express.Router()
const ReviewsController = require('../Controllers/HotelReviews.controllers')

router.route('/postReviews')
    .post(ReviewsController.postReviews)

router.route('/getAllReviews')
    .get(ReviewsController.getAllReviews)

router.route('/updateReview/:id')
    .patch(ReviewsController.updateReview)

router.route('/getReviewsByStatus')
    .get(ReviewsController.getReviewByStatus)




module.exports = router