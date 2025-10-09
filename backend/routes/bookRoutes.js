const { checkToken } = require('../auth/token_validation')
const bookController=require('../controllers/bookController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',bookController.getbooks)
// router.get('/access/:id/:employId',bookController.)
router.post('/create',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),bookController.addbook)

router.get('/get/:id',bookController.getbookById)
router.get('/activeUser/:userId',bookController.getactivebooksuser)
router.get('/historyUser/:userId',bookController.gethistorybooksuser)
router.get('/activeSeller/:sellerId',bookController.getactivebooksseller)
router.get('/complete/:sellerId',bookController.getcompletebooksseller)
router.get('/warranty/:sellerId',bookController.getwarrantybooksseller)
router.get('/history/:sellerId',bookController.gethistorybooksseller)
router.get('/cancel/:id/:sellerId',bookController.cancelBook)
router.get('/request/:id/:sellerId',bookController.requestBook)
router.get('/category/:categoryId/:sellerId',bookController.getbooksCategory)
router.put('/update/:id',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),bookController.updatebook)
router.put('/assignWeb/:id',bookController.updateassignbookweb)
router.put('/assignApp/:id/:acceptBookId',bookController.updateassignbookapp)
router.delete('/delete/:id',bookController.deletebook)
router.delete('/delmin',bookController.deleteExpiredBooks)
router.put('/claim/:id',bookController.updatebookclaim)
router.get('/claim/:sellerId',bookController.getclaimbooksseller)
router.get('/claims',bookController.getClaimbooks)
router.get('/cancel',bookController.getCancelbooks)


module.exports=router

