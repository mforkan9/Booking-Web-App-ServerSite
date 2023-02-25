const Client = require("../Models/Client.model")
const HotelReviews = require("../Models/HotelReviews.model")


exports.postReviews = async(req,res) =>{
    try {
        const reviewsData = req.body
        
        const result = await HotelReviews.create(reviewsData)

        await Client.findOneAndUpdate({ email: reviewsData.email }, { $push: {activity: {text:'Reviews Added', date:new Date()}} }, { runValidators: true, new: true })

        res.status(200).json({
            status:'success',
            result:result
        })

    } catch (error) {
        res.status(400).json({
            status:'fail',
            error
        })
    }
}

exports.getAllReviews = async(req,res) =>{
    const { page, limit } = req.query
    const skipData = (page - 1) * parseInt(limit)
    const limitData = parseInt(limit)
    try {
        const reviewsData = await HotelReviews.find()
        .skip(skipData)
        .limit(limitData)
        .sort({createdAt:-1}) 
        
        const totalReview = await HotelReviews.find({}).count()

        res.status(200).json({
            status:'success',
            data:reviewsData,
            total:totalReview
        })
    } 
    catch (error) {
       res.status(400).json({
        status:'fail',
        error
       }) 
    }
}

exports.updateReview = async(req,res) =>{
    try {
        const id = req.params.id
        const status = req.body.status

        const result = await HotelReviews.findOneAndUpdate({_id:id},{$set:{status:status}},{runValidators:true,new:true})

        res.status(200).json({
            status:'success',
            result:result
        })
      
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            error
        })
    }
}

exports.getReviewByStatus = async (req,res) =>{
    try {
      const status = req.query.status
      
      const data = await HotelReviews.find({status:status})

      const total = await HotelReviews.find({status:status}).count()

      res.status(200).json({
        status:'success',
        data:data,
        totalPublished:total
      })
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            error
        })
    }
}