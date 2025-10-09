const { checkToken } = require('../auth/token_validation')
const acceptBookController=require('../controllers/acceptBookController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',acceptBookController.getacceptBooks)
// router.get('/access/:id/:employId',acceptBookController.)
router.post('/create',acceptBookController.addacceptBook)

router.get('/get/:id',acceptBookController.getacceptBookById)
router.get('/user/:userId',acceptBookController.getacceptBooksUser)
router.put('/update/:id',acceptBookController.updateacceptBook)
router.delete('/delete/:id',acceptBookController.deleteacceptBook)
router.delete('/del/:id',acceptBookController.deleteacceptBookSingle)


module.exports=router

