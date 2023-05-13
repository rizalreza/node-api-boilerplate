module.exports = {
    'POST /api/v1/sample': (req, res) => {
        const { code } = req.query;

        switch (parseInt(code, 10)) {
        case 400:
            res.send({
                success: false,
            });
            break;
        default:
            res.send({
                success: true,
            });
            break;
        }
    },
};