/**
 * @swagger
 * tags:
 *   name: League
 *   description: League management and operations
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /league/generate:
 *   post:
 *     summary: Generate league
 *     tags: [League]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: League generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
