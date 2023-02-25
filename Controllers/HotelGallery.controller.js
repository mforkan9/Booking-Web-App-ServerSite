const Imagekit = require('imagekit');
const HotelGallery = require('../Models/HotelGallery.model');

const imagekit = new Imagekit({
    urlEndpoint: 'https://ik.imagekit.io/qn3a4n63b',
    publicKey: 'public_ZFrfBtvKxNspT+HqDIHl6KLQLJg=',
    privateKey: 'private_qlWtHvu01ToyNJiUppBpwPNU+Hs='
});

exports.getImagekitAuth = async (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
}

exports.uploadImage = async (req, res) => {
    try {
        const imageUrl = req.body
        const result = await HotelGallery.create(imageUrl)

        res.status(200).json({
            status: 'success',
            result: result
        })
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

exports.getAllImage = async (req, res) => {
    try {
        const data = await HotelGallery.find({})

        res.status(200).json({
            status: 'success',
            result: data
        })
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

exports.deleteGalleryImage = async (req,res) =>{
    try {
        const id = req.params.id

        const result = await HotelGallery.deleteOne({_id:id})

           res.status(200).json({
            status: 'success',
            result: result
        })
    } 
    catch (error) {
          res.status(400).json({
            status: 'fail',
            error
        })
    }
}