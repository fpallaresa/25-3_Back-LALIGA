/**
 * @swagger
 * components:
 *  schemas:
 *    Match:
 *      type: object
 *      properties:
 *        standing:
 *          type: string
 *          description: ID of the matchday the match belongs to
 *        homeTeam:
 *          type: string
 *          description: ID of the home team
 *        awayTeam:
 *          type: string
 *          description: ID of the away team
 *        homeGoals:
 *          type: number
 *          description: Number of goals scored by the home team
 *        awayGoals:
 *          type: number
 *          description: Number of goals scored by the away team
 *        status:
 *          type: string
 *          description: Status of the match (NODISPUTADO, FINALIZADO)
 */
