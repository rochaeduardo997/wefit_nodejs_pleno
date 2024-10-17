/**
 * @swagger
 * components:
 *   schemas:
 *     Register_Person_Body:
 *       type: object
 *       required:
 *         - fullName
 *         - responsibleCPF
 *         - hasCNPJ
 *         - cpfcnpj
 *         - hasAcceptedTerms
 *         - contact
 *         - address
 *       properties:
 *         fullName:
 *           type: string
 *         responsibleCPF:
 *           type: string
 *         hasCNPJ:
 *           type: boolean
 *         cpfcnpj:
 *           type: string
 *         hasAcceptedTerms:
 *           type: boolean
 *         contact:
 *           $ref: '#/components/schemas/Contact'
 *         address:
 *           $ref: '#/components/schemas/Address'
 *
 *     Register_Person_Response:
 *       type: object
 *       properties:
 *         result:
 *           properties:
 *             id:
 *               type: string
 *             fullName:
 *               type: string
 *             responsibleCPF:
 *               type: string
 *             hasCNPJ:
 *               type: boolean
 *             cpfcnpj:
 *               type: string
 *             hasAcceptedTerms:
 *               type: boolean
 *             contact:
 *               $ref: '#/components/schemas/Contact'
 *             address:
 *               $ref: '#/components/schemas/Address'
 *
 *     Contact:
 *       type: object
 *       required:
 *         - cellphone
 *         - telephony
 *         - email
 *       properties:
 *         cellphone:
 *           type: string
 *         telephony:
 *           type: string
 *         email:
 *           type: string
 *
 *     Address:
 *       type: object
 *       required:
 *         - zipcode
 *         - street
 *         - streetNumber
 *         - city
 *         - neighborhood
 *         - state
 *       properties:
 *         zipcode:
 *           type: string
 *         street:
 *           type: string
 *         streetNumber:
 *           type: number
 *         complement:
 *           type: string
 *         city:
 *           type: string
 *         neighborhood:
 *           type: string
 *         state:
 *           type: string
 */
