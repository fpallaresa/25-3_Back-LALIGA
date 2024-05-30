/**
 * @swagger
 * components:
 *  schemas:
 *    Matchday:
 *      type: object
 *      properties:
 *        matchdayNumber:
 *          type: number
 *          description: Number of the matchday
 *        date:
 *          type: string
 *          format: date-time
 *          description: Date of the matchday
 *        matches:
 *          type: array
 *          items:
 *            type: string
 *          description: List of match IDs associated with the matchday
 */
