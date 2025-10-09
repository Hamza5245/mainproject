const { checkToken } = require('../auth/token_validation')
const userController=require('../controllers/userController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',userController.getusers)
router.get('/getadmin',userController.getadmins)
router.post('/create',upload.fields([{name:'image',maxCount:1}]),userController.adduser)

router.get('/get/:id',userController.getuserById)
router.get('/getEmail/:email',userController.getuserByemail)
router.put('/update/:id',upload.fields([{name:'image',maxCount:1}]),userController.updateuser)
router.delete('/delete/:id',userController.deleteuser)


module.exports=router

