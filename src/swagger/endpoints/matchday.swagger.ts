/**
 * @swagger
 * tags:
 *   name: Matchday
 *   description: Matchday management and operations
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
 * /matchday:
 *   get:
 *     summary: Get all matchdays
 *     tags: [Matchday]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of matchdays
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Matchday'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /matchday/{id}:
 *   get:
 *     summary: Get matchday by ID
 *     tags: [Matchday]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Matchday ID
 *     responses:
 *       200:
 *         description: Matchday object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Matchday'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Matchday not found
 */
