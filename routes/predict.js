'use strict';

const { getPrediction } = require('../controllers/predict'); // Ensure this path is correct
const Boom = require('@hapi/boom');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
});

const authenticate = async (request, h) => {
    const { id } = request.params;
    if (id) {
        return h.continue;
    } else {
        throw Boom.unauthorized('Unauthorized');
    }
};

const predictsRoutes = [
    {
        method: 'POST',
        path: '/api/predicts/{id}',
        options: {
            pre: [{ method: authenticate }],
            payload: {
                maxBytes: 10 * 1024 * 1024, // 10MB limit
                parse: true,
                output: 'stream',
                allow: 'multipart/form-data',
            }
        },
        handler: async (request, h) => {
            return getPrediction(request, h);
        }
    }
];

module.exports = predictsRoutes;
