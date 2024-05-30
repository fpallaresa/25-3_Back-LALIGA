enum CUSTOM_ROL {
  "PLAYER" = "PLAYER",
  "DELEGATE" = "DELEGATE",
  "ADMIN" = "ADMIN",
}

declare namespace Express {
  export interface Request {
    user: {
      rol: CUSTOM_ROL;
      id: string;
    };
  }
}
