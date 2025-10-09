const { checkToken } = require('../auth/token_validation')
const topupController = require('../controllers/topupController')
const { upload } = require('../upload/UploadFile')

const router = require('express').Router()

router.get('/get', topupController.gettopups)
router.post('/create', upload.fields([{name:'transactionProof',maxCount:1}]), topupController.addtopup)

router.get('/get/:id', topupController.gettopupById)
router.get('/getBySeller/:sellerId', topupController.gettopupsBySellerId)
router.put('/update/:id', upload.fields([{name:'transactionProof',maxCount:1}]), topupController.updatetopup)
router.delete('/delete/:id', topupController.deletetopup)

router.put('/approve/:id', topupController.approveTopup)
router.put('/reject/:id', topupController.rejectTopup)
router.put('/refund/:id', topupController.refundTopup)

// Transaction routes
router.get('/transactions', topupController.getAllTransactions)
router.get('/transactions/seller/:sellerId', topupController.getTransactionsBySellerId)

// Dashboard routes
router.get('/dashboard', topupController.getDashboardStats)
router.get('/dashboard/seller/:sellerId', topupController.getSellerDashboardStats)

module.exports = router
