const { checkToken } = require('../auth/token_validation')
const couponController=require('../controllers/couponController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',couponController.getAllData)
// router.get('/access/:id/:employId',cityController.)
router.post('/create',couponController.addData)

router.get('/get/:id',couponController.getDataById)
router.get('/getCoupon/:code/:categoryId',couponController.getDataByCode)
router.put('/update/:id',couponController.updateData)
router.delete('/delete/:id',couponController.deleteData)


module.exports=router

