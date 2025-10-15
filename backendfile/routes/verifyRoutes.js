const { checkToken } = require('../auth/token_validation')
const verifyController=require('../controllers/verifyController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',verifyController.getverifys)
// router.get('/access/:id/:employId',verifyController.)
router.post('/create',verifyController.addverify)

router.get('/get/:id',verifyController.getverifyById)
router.get('/whatsapp/:phone/:otp',verifyController.getverifyByPhone)
router.put('/update/:id',verifyController.updateverify)
router.delete('/delete/:id',verifyController.deleteverify)


module.exports=router

