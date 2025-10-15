const { checkToken } = require('../auth/token_validation')
const cityController=require('../controllers/cityController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',cityController.getcitys)
// router.get('/access/:id/:employId',cityController.)
router.post('/create',cityController.addcity)

router.get('/get/:id',cityController.getcityById)
router.put('/update/:id',cityController.updatecity)
router.delete('/delete/:id',cityController.deletecity)


module.exports=router

