import swaggerJsDoc from 'swagger-jsdoc';
const swaggerSpecs = swaggerJsDoc({
  definition: {
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
