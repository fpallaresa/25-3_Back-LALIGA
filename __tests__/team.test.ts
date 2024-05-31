import { Team, ITeamCreate } from "../src/domain/entities/team.entity";
import request from "supertest";
import { app } from "../src/server";
import { User, IUserCreate, ROL } from "../src/domain/entities/user.entity";

describe("Team controller", () => {
  const teamMock: ITeamCreate = {
    name: "Team TEST",
    alias: "TST",
  };

  const adminUserMock: IUserCreate = {
    email: "admin@mail.com",
    password: "12345678",
    firstName: "Admin",
    lastName: "User",
    image: "",
    rol: ROL.ADMIN,
  };

  let adminToken: string;

  beforeAll(async () => {
    await Team.collection.drop();
    await User.collection.drop();

    const adminUser = new User(adminUserMock);
    await adminUser.save();

    const adminResponse = await request(app).post("/user/login").send({ email: adminUserMock.email, password: adminUserMock.password });
    adminToken = adminResponse.body.token;

    await new Team(teamMock).save();
  });

  it("GET /team - should return 200 and teams if logged in as admin", async () => {
    const response = await request(app).get("/team").set("Authorization", `Bearer ${adminToken}`).expect(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toHaveProperty("name", teamMock.name);
  });

});
