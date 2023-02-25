
const admin = require("firebase-admin");
const serviceAccount = require("../firebase/bookingweb-app-firebase-adminsdk-58gye-d356de4450.json");



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = async(req,res,next) =>{
  try {
    const token = req?.headers?.authorization.split(' ')?.[1]

    if (!token) {
      return res.status(401).json({
        status:'fail',
        message:'unauthorized access'
      })
    }

    const decodedToken = await admin.auth().verifyIdToken(token)
    req.decoded = decodedToken

    next()
  } 
  catch (error) {
    res.status(404).json({
      status:'fail',
      error
    })
  }
}


