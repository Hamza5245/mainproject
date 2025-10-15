const { checkToken } = require('../auth/token_validation')
const quotationController=require('../controllers/quotationController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',quotationController.getquotations)
// router.get('/access/:id/:employId',quotationController.)
router.post('/create',quotationController.addquotation)

router.get('/book/:bookId',quotationController.getquotationsbook)
router.get('/get/:id',quotationController.getquotationById)
router.put('/update/:id',quotationController.updatequotation)
router.delete('/delete/:id',quotationController.deletequotation)


module.exports=router

