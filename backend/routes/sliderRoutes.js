const { checkToken } = require('../auth/token_validation')
const sliderController=require('../controllers/sliderController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',sliderController.getsliders)
// router.get('/access/:id/:employId',sliderController.)
router.post('/create',upload.fields([{name:'image',maxCount:1}]),sliderController.addslider)

router.get('/get/:id',sliderController.getsliderById)
router.put('/update/:id',upload.fields([{name:'image',maxCount:1}]),sliderController.updateslider)
router.delete('/delete/:id',sliderController.deleteslider)


module.exports=router

