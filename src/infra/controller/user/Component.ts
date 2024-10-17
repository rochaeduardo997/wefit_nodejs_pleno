/**
 * @swagger
 * components:
 *   schemas:
 *     Login_Body:
 *       type: object
 *       required:
 *         - login
 *         - password
 *       properties:
 *         login:
 *           type: string
 *         password:
 *           type: string
 *
 *     Login_Response:
 *       type: object
 *       properties:
 *         result:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             username:
 *               type: string
 *             status:
 *               type: boolean
 *             token:
 *               type: string
 */
