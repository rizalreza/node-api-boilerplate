var express = require('express');
const { httpResponse } = require('../helpers/response');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.send('Hello world !!');
});

router.get(`/health`, async (req, res, next) => {
    try {
        const healthUseCase = new (require("../useCase/HealthUseCase"));
        await httpResponse(await healthUseCase.exec(), res);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
