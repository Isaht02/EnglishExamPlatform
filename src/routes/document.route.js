const express = require('express')
const DocumentController = require('../controllers/document.controller')
const router = express.Router()

router.post('/', DocumentController.createDocument)
router.get('/', DocumentController.getDocuments)
router.get('/:id', DocumentController.getDocumentById)

module.exports = router