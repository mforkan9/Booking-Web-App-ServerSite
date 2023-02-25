const Admin = require("../Models/Admin.model")

exports.addUser = async (req,res) => {
    try {
       const data = req.body
      const result = await Admin.create(data)

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

exports.adminAuth = async(req,res) =>{
  try {
    const email = req.body.email
     const data = await Admin.findOne({email:email}).select({email:1,_id:0})

    if (!data) {
     return res.status(200).json({
        status:'fail',
        isAdmin:false,
        message:"You aren't user,please contact Admin"
      })
    }

    res.status(200).json({
      status:'success',
      isAdmin:true,
      data:data
    })

  } catch (error) {
    res.status(400).json({
      status:'fail',
      error
    }) 
  }
}

exports.getAllUser = async (req,res) =>{
  try {
    const data = await Admin.find()

    res.status(200).json({
      status:'success',
      data:data
    })
  } 
  catch (error) {
    res.status(400).json({
      status:'fail',
      error
    }) 
  }
}