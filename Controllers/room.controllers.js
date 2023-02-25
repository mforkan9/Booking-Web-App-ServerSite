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

exports.getListAllRoom = async (req,res) =>{
    const {page,limit,filter} = req.query
    const skipData = (page - 1 ) * parseInt(limit)
    const limitData = parseInt(limit)
    try {
        const allData = await RoomDatas.find({roomType:{ $regex: '.*' + filter + '.*' }})
        .skip(skipData)
        .limit(limitData)
        .sort({roomNumber: 1})

         const reserveddata = await RoomDatas.find()
    
         for (const element of reserveddata) {

           const now = new Date();
           const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
           const findDate = await element.reserved.some(pd => (new Date(pd.checkIn).getTime() === today.getTime()) || (today.getTime() <= new Date(pd.checkOut).getTime() && today.getTime() >= new Date(pd.checkIn).getTime()))
 
           if (findDate) {
            await RoomDatas.findOneAndUpdate({_id:element._id},{$set:{status:'Booked'}},{runValidators:true,new:true})
           }
           else{
            await RoomDatas.findOneAndUpdate({_id:element._id},{$set:{status:'Active'}},{runValidators:true,new:true})
            }
            
      
         }

       const total = await RoomDatas.count()
        res.status(200).json({
            status: 'success',
            data: allData,
            totalData: total,
            roomAvailable:reserveddata
        })
    } catch (error) {
        res.json({
            status:'fail',
            message: error
        })
    }

}
exports.getRoomByStatus = async (req,res) =>{
    const {status,page,limit,filter} = req.query
    const skipData = (page - 1 ) * parseInt(limit)
    const limitData = parseInt(limit)
    try {
        const allActiveData = await RoomDatas.find({status:status,roomType:{ $regex: '.*' + filter + '.*' }})
        .skip(skipData)
        .limit(limitData)
        .sort({roomNumber: 1})

    
       const total = await RoomDatas.find({status:status}).count()
        res.status(200).json({
            status: 'success',
            data: allActiveData,
            totalData: total,
        })
    } catch (error) {
        res.json({
            status:'fail',
            message: error
        })
    }

}

exports.getRoomById = async (req,res) =>{
    const findId = req.params.id
    try {
        const result = await RoomDatas.findById({_id: findId })
    
        res.status(200).json({
            status:'success',
            value: result,
        })
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Cannot get Data',
            error:error
        })
    }
}

exports.getRoomBookingDate = async (req,res) =>{
    const findId = req.params.id
    const {page,limit} = req.query
    const skipData = (page - 1 ) * parseInt(limit)
    const limitData = parseInt(limit)
    try {
        const result = await RoomDatas.findById({_id: findId }).where('reserved').slice(skipData,limitData)
        
         const reservedCount = await RoomDatas.findById({_id:findId})
 
        res.status(200).json({
            status:'success',
            value: result,
            totalCount:reservedCount.reserved.length
        })
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Cannot get Data',
            error:error
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

exports.updateRoom = async (req,res) =>{
    try { 
        const updateID = req.params.id
        const {roomInnerImage,...updateData} = req.body
     
        const result = await RoomDatas.updateOne({_id: updateID},{$set:{... updateData},$push:{roomInnerImage}},{runValidators:true,context : 'query'})
       

        console.log(result)
        
        res.status(200).json({
            status:'success',
            data:result
        }) 
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            message:'cannot update data',
            error:error.message
        })
    }
}

exports.deleteInnerImg = async (req,res) =>{
    try {
        const {id,index} = req.query
        // const query = { _id: id, ['roomInnerImage.' + index]:{$exists:true}};
        // console.log(query);
        // const unset = {$unset:{['roomInnerImage.' + index]:null}};
        // console.log(unset);
        const result = await RoomDatas.updateOne({_id:id},{$pull:{roomInnerImage:index}},{upsert:false});

        if (!(result.modifiedCount > 0)) {
            return res.status(404).json({
                status:'fail',
                message:'Couldnt delete Image'
            })
        }
        res.status(200).json({
            status:'success',
            message:'Deleted successfully'
        })
    } catch (error) {
        console.log(error);
       res.status(400).json({
        status:'fail',
        message:'couldnt delete',
        error:error
        
       }) 
    }
}

exports.getBannerDisplayRoom = async (req,res) =>{
   try {
      const BannerRoom = await RoomDatas.find()
      .limit(12)
      .sort({roomNumber: 1})

      res.status(200).json({
        status:'success',
        data:BannerRoom
      })
   } 
   catch (error) {
     res.status(400).json({
        status:'fail',
        message:'cannot get data',
        error:error
     })
   }
}

exports.checkAvailablity = async (req,res) =>{
    try {
       const { checkIn, checkOut,capcity }  = req.body.checkData

       const data = await RoomDatas.find({$and:[{
        $or:[{$and:[
        {reserved:{$elemMatch:{$or:[{checkIn:{$gte:checkOut}},{checkOut:{$lte:checkIn}}]}}},
        {reserved : { $not :  {$elemMatch : {$or: [ { checkIn: { $gte: checkIn, $lte : checkOut } }, { checkOut: { $lte: checkOut , $gte :  checkIn}}]}}}},
         ]}, {"reserved.0":{$exists:false}}
        ]},
        {roomBedCapacity:{$gte:capcity}}
      ]})
         

      res.status(200).json({
        status:'success',
        data:data
     })


       
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            message:'cannot get data',
            error:error
         }) 
    }
}

// exports.getViewAllRoom = async (req,res) =>{
//     try {
//        const {page,limit} = req.query
//        const skipPage = (page - 1) * parseInt(limit)
//        const totalRoom = await RoomDatas.count()
//        const allRoom = await RoomDatas.find()
//        .skip(skipPage)
//        .limit(limit)
//        .sort({roomNumber: 1})

      
//        res.status(200).json({
//         status:'success',
//         data: allRoom,
//         totalData: totalRoom
//        })
//     } 
//     catch (error) {
//        res.status(400).json({
//         status:'fail',
//         message:'cannot get Data',
//         error:error
//        }) 
//     }
// }