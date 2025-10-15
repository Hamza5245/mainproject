const { checkToken } = require('../auth/token_validation')
const sellerController=require('../controllers/sellerController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',sellerController.getselleres)
router.get('/active/get',sellerController.getActiveselleres)
router.post('/create',upload.fields([{name:'image',maxCount:1},{name:'frontImage',maxCount:1},{name:'backImage',maxCount:1}]),sellerController.addseller)

router.get('/get/:id',sellerController.getsellerById)
router.get('/getSeller/:country',sellerController.getselleresApp)
router.get('/getEmail/:email',sellerController.getsellerByemail)
router.get('/getPhone/:phone',sellerController.getsellerByphone)
router.put('/update/:id', upload.fields([{name:'image',maxCount:1},{name:'frontImage',maxCount:1},{name:'backImage',maxCount:1}]),sellerController.updateseller)
router.delete('/delete/:id',sellerController.deleteseller)


module.exports=router

