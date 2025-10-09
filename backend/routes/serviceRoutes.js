const { checkToken } = require('../auth/token_validation')
const serviceController=require('../controllers/serviceController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',serviceController.getservices)
router.post('/create',upload.fields([{name:'image',maxCount:1}]),serviceController.addservice)

router.get('/get/:id',serviceController.getserviceById)
router.put('/update/:id',upload.fields([{name:'image',maxCount:1}]),serviceController.updateservice)
router.delete('/delete/:id',serviceController.deleteservice)


module.exports=router

