const typeSeafoodController = require('../controllers/typeSeafoodController')

const router = require('express').Router()

router.post('/', typeSeafoodController.addTypeSeafood)
router.get('/', typeSeafoodController.getAllTypeSeafood)
router.get('/detail/:id', typeSeafoodController.getListType)

module.exports = router
