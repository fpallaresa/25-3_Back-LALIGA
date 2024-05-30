/**
 * @swagger
 * tags:
 *   name: Team
 *   description: Team management and operations
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
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The team ID
 *         name:
 *           type: string
 *           description: The name of the team
 *         players:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         matches:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Match'
 *       required:
 *         - name
 *     TeamCreate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the team
 *       required:
 *         - name
 */

/**
 * @swagger
 * /team:
 *   get:
 *     summary: Retrieve a list of teams
 *     security:
 *       - bearerAuth: []
 *     tags: [Team]
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
 *         description: A list of teams
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
 *                     $ref: '#/components/schemas/Team'
 */

/**
 * @swagger
 * /team/{id}:
 *   get:
 *     summary: Get a team by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The team ID
 *     responses:
 *       200:
 *         description: Team details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 */

/**
 * @swagger
 * /team:
 *   post:
 *     summary: Create a new team
 *     security:
 *       - bearerAuth: []
 *     tags: [Team]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamCreate'
 *     responses:
 *       201:
 *         description: Team created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 */

/**
 * @swagger
 * /team/{id}:
 *   delete:
 *     summary: Delete a team by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The team ID
 *     responses:
 *       200:
 *         description: Team deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 */

/**
 * @swagger
 * /team/{id}:
 *   put:
 *     summary: Update a team by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The team ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamCreate'
 *     responses:
 *       200:
 *         description: Team updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 */
