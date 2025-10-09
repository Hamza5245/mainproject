const { checkToken } = require('../auth/token_validation')
const taxController=require('../controllers/taxController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',taxController.gettaxs)
// router.get('/access/:id/:employId',taxController.)
router.post('/create',taxController.addtax)

router.get('/get/:id',taxController.gettaxById)
router.get('/promo/:code',taxController.gettaxspromo)
router.put('/update/:id',taxController.updatetax)
router.delete('/delete/:id',taxController.deletetax)


module.exports=router

