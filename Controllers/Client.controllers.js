const Client = require('../Models/Client.model')
const HotelReviews = require('../Models/HotelReviews.model')


exports.createUser = async (req, res) => {
    try {
        const filterEmail = req.params.email
        const currentUser = req.body
        const filter = { email: filterEmail }
        const updateUser = {
            $set: currentUser
        }
        const options = { upsert: true }
        const result = await Client.findOneAndUpdate(filter, updateUser, options)

        res.status(200).json({
            status: 'success',
            result: result
        })
    }
    catch (error) {
        res.status(402).json({
            status: 'fail',
            message: 'user update fail'
        })
    }
}

exports.userUpdate = async (req, res) => {
    try {
        const tokenEmail = req.decoded.email
        const email = req.params.email

        if (!(tokenEmail === email)) {
            return res.status(404).json({
                status: 'fail',
                message: 'user not found'
            })
        }
        
        const updateInfo = req.body

        const result = await Client.findOneAndUpdate({email:email},{$set:updateInfo},{runValidators:true,new:true})


        res.status(200).json({
            status:'success',
            result
        })
        
    } catch (error) {
        res.status(402).json({
            status:'fail',
            error
        })
    }
}


exports.getFindUserByToken = async (req, res) => {
    const { page, limit } = req.query
    const skipData = (page - 1) * parseInt(limit)
    const limitData = parseInt(limit)


    try {
        const tokenEmail = req.decoded.email
        const email = req.params.email

        if (!(tokenEmail === email)) {
            return res.status(404).json({
                status: 'fail',
                message: 'user not found'
            })
        }
        const user = await Client.findOne({ email: email }).select('-bookedId')

        if (!user) {
            res.status(404).json({
                status: 'fail',
                message: 'user not found'
            })
        }

        const bookedData = await Client.findById({ _id: user._id })
            .select('bookedId')
            .populate({
                path: 'bookedId',
                options: {
                    sort: { 'createdAt': -1 },
                    perDocumentLimit: limitData,
                    skip: skipData
                },
                populate: { path: 'bookedFor' }
            })

        const totalCount = await Client.findById({ _id: user._id }).populate('bookedId')


        res.status(200).json({
            status: 'success',
            profileData: user,
            booking: bookedData,
            totalCount: totalCount.bookedId.length
        })

    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            error
        })
    }
}



exports.getAllUser = async (req, res) => {
    const { filter, page, limit } = req.query
    const skipData = (page - 1) * parseInt(limit)
    const limitData = parseInt(limit)

    try {
        const guest = await Client.find({ email: new RegExp(filter, 'i')})
            .skip(skipData)
            .limit(limitData)


        const totalCount = await Client.find({}).count()
        res.status(200).json({
            status: 'success',
            data: guest,
            totalCount: totalCount
        })
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            error: error
        })
    }
}

exports.getFindUserByEmail = async (req, res) => {
    const { page, limit } = req.query
    const skipData = (page - 1) * parseInt(limit)
    const limitData = parseInt(limit)
    try {
        const email = req.params.email

        const user = await Client.findOne({ email: email }).select('-bookedId')

        if (!user) {
            res.status(404).json({
                status: 'fail',
                message: 'user not found'
            })
        }

        const bookedData = await Client.findById({ _id: user._id })
            .populate({
                path: 'bookedId',
                options: {
                    sort: { 'createdAt': -1 },
                    perDocumentLimit: limitData,
                    skip: skipData
                },
                populate: { path: 'bookedFor' }
            })


        const totalCount = await Client.findById({ _id: user._id }).populate('bookedId')

        res.status(200).json({
            status: 'success',
            data: user,
            totalData: totalCount.bookedId.length,
            bookedData: bookedData
        })
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            error: error,
            message: "couldn't find user"
        })
    }
}

exports.deleteClient = async (req, res) => {
    const deletedID = req.params.id
    try {
        const result = await Client.deleteOne({ _id: deletedID })
        res.status(200).send({
            status: 'success',
            result: result
        })
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}

