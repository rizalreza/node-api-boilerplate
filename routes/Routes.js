const path = require("path");
const router = require("./index");
const mgrSwagger = require('mgr-swagger-express')
const swaggerUI = require('swagger-ui-express')

const SampleControllerDocs = require("../controllers/SampleController.docs")
const UserController = require("../controllers/UserController")
const SampleParams = require('../docs/SampleParams')

const swaggerDocument = mgrSwagger.default({
    name: "Arjuna",
    version: process.env.APP_VERSION,
    description: "Arjuna is express boilerplate",
    host: process.env.NODE_ENV === 'local'
        ? `${process.env.APP_HOST}:${process.env.APP_PORT}`
        : `${process.env.APP_HOST}`,
    basePath: '/',
})

router.use(
    '/api/docs',
    swaggerUI.serve,
    swaggerUI.setup({
        ...swaggerDocument,
        schemes: ["http", "https"],
        securityDefinitions: {
            Bearer: {
                type: "apiKey",
                in: "header",
                name: "authorization",
            },
        },
        definitions: {
            SampleParams,
        },
        components: {
            responses: {
                UnauthorizedError: {
                    description: "Authorization failed",
                    examples: {
                        "application/json": JSON.stringify({
                            success: false,
                            message: "Auth Failed",
                            messageTitle: null,
                            data: null,
                            responseTime: "0 ms.",
                        })
                    }
                },
            },
        },
        paths: {
            ...SampleControllerDocs,
        }
    }, {
        explorer: true
    })
)

const mockApiMiddleware = require('express-mock-api-middleware')(
    path.resolve(__dirname, '../controllers'),
    { ignore: ['*Controller.js', '*.docs.js'] }
);
router.use('/mocks', mockApiMiddleware);

router.post(
    `/api/:version/register`,
    async (req, res, next) => {
        try {
            await (new UserController()).register(req, res, next);
        } catch (e) {
            next(e);
        }
    }
);

module.exports = router;

