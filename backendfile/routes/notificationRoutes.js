const { checkToken } = require('../auth/token_validation')
const notificationController=require('../controllers/notificationController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',notificationController.getnotifications)
// router.get('/access/:id/:employId',notificationController.)
router.post('/create',notificationController.addnotification)

router.get('/get/:id',notificationController.getnotificationById)
router.put('/update/:id',notificationController.updatenotification)
router.delete('/delete/:id',notificationController.deletenotification)


module.exports=router

