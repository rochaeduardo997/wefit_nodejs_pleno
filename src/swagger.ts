import swaggerJsDoc from 'swagger-jsdoc';
const swaggerSpecs = swaggerJsDoc({
  definition: {
    components:{
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    openapi: "3.0.0",
    info: {
      title: "Desenvolvedor(a) Node.js Pleno - WeFit",
      version: "1.0.0",
      description: ""
    },
    servers: [
      {
        url: "http://localhost:4568",
        description: "",
      },
    ],
  },
  apis: [`${__dirname}/infra/controller/**/*.ts`]
});

export default swaggerSpecs;
