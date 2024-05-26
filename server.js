'use strict';

const Hapi = require('@hapi/hapi');
const predictsRoutes = require('./routes/predict'); // Ensure this path is correct

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 8080,
        host: 'localhost'
    });

    await server.register(require('@hapi/inert'));
    await server.register(require('@hapi/vision'));
    await server.register(require('@hapi/basic'));

    server.route(predictsRoutes);

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return h.response({
                    message: 'Welcome to H-buddy Rest API'
                }).code(200);
            }
        },
        {
            method: '*',
            path: '/{any*}',
            handler: (request, h) => {
                return h.response({
                    message: '404 Endpoint Not Found'
                }).code(404);
            }
        }
    ]);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
