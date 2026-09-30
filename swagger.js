const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Student Management API',
        description: 'Student and Courses Management API'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
