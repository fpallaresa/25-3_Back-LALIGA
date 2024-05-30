/**
 * @swagger
 * tags:
 *   name: Standings
 *   description: Standings management and operations
 */

/**
 * @swagger
 * /standing:
 *   get:
 *     summary: Get standings
 *     tags: [Standings]
 *     responses:
 *       200:
 *         description: List of standings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   position:
 *                     type: integer
 *                   teamName:
 *                     type: string
 *                   points:
 *                     type: integer
 *                   played:
 *                     type: integer
 *                   wins:
 *                     type: integer
 *                   draws:
 *                     type: integer
 *                   losses:
 *                     type: integer
 *                   goalsFor:
 *                     type: integer
 *                   goalsAgainst:
 *                     type: integer
 *                   goalDifference:
 *                     type: integer
 */
