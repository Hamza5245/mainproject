const { checkToken } = require('../auth/token_validation')
const subCategoryController=require('../controllers/subCategoryController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',subCategoryController.getsubCategorys)
// router.get('/access/:id/:employId',subCategoryController.)
router.post('/create',upload.fields([{name:'image',maxCount:1}]),subCategoryController.addsubCategory)

router.get('/getCategory/:id',subCategoryController.getsubCategorysCategory)
router.get('/get/:id',subCategoryController.getsubCategoryById)
router.put('/update/:id',upload.fields([{name:'image',maxCount:1}]),subCategoryController.updatesubCategory)
router.delete('/delete/:id',subCategoryController.deletesubCategory)


module.exports=router

