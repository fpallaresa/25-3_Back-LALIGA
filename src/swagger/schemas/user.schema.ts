/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - firstName
 *        - lastName
 *        - rol
 *      properties:
 *        email:
 *          type: string
 *          description: Email of the user
 *        password:
 *          type: string
 *          description: Password of the user
 *        firstName:
 *          type: string
 *          description: First name of the user
 *        lastName:
 *          type: string
 *          description: Last name of the user
 *        image:
 *          type: string
 *          description: Image URL of the user
 *        team:
 *          type: string
 *          description: ID of the team the user belongs to
 *        rol:
 *          type: string
 *          description: Role of the user (PLAYER, DELEGATE, ADMIN)
 */
