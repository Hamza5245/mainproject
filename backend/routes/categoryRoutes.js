const { checkToken } = require('../auth/token_validation')
const categoryController=require('../controllers/categoryController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',categoryController.getcategorys)
// router.get('/access/:id/:employId',categoryController.)
router.post('/create',upload.fields([{name:'image',maxCount:1}]),categoryController.addcategory)

router.get('/get/:id',categoryController.getcategoryById)
router.get('/getService/:serviceId/:name',categoryController.getcategorysService)
router.put('/update/:id',upload.fields([{name:'image',maxCount:1}]),categoryController.updatecategory)
router.delete('/delete/:id',categoryController.deletecategory)


module.exports=router

