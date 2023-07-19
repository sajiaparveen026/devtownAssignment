const router = require('express').Router();

router.route('/')
.get((req,res)=>res.json({msg:"Test Notes"}))
.post()

router.route('/:id')
.get()
.post()
.delete()

module.exports = router;