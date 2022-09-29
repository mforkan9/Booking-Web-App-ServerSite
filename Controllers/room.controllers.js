const RoomDatas = require('../Models/createRoom.model')

exports.postCreateRoom = async (req,res) =>{
    const createData = req.body
    try {
        const result = await RoomDatas.create(createData)

        res.status(200).json({
            status:'success',
            data:result
        })
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            message:'donnot post data',
            error: error
        })
    }
}

exports.getAllCreateRoom = async (req,res) =>{
    const {page,limit,filter} = req.query
    const skipData = (page - 1 ) * parseInt(limit)
    const limitData = parseInt(limit)
    try {
        const allData = await RoomDatas.find({roomType:{ $regex: '.*' + filter + '.*' }})
        .skip(skipData)
        .limit(limitData)
        .sort({roomNumber: 1})

       const total = await RoomDatas.count()
        res.status(200).json({
            status: 'success',
            data: allData,
            totalData: total
        })
    } catch (error) {
        res.json({
            status:'fail',
            message: error
        })
    }

}


exports.deleteCreateRoom = async (req,res) =>{
    const deletedID = req.params.id
    try {
      const result = await RoomDatas.deleteOne({_id: deletedID})
      res.status(200).send({
        status:'success',
        result: result
      })  
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            message: error
        })
    }
}