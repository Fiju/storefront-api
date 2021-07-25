import request from "supertest";

import { User } from "../../models/user";
import app from "../../server";

describe("Testing User handlers", () => {
  it("should check create endpoint", async () => {
    const user = { firstname: "Steve", lastname: "Fox", password: "password" };
    const res = await request(app).post("/users").send(user);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  it("should login the user", async () => {
    const user = { firstname: "Steve", password: "password" };
    const res = await request(app).post("/users/authenticate").send(user);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  it("should give 401 with error", async () => {
    const user = { firstname: "Steve", password: "passwords" };
    const res = await request(app).post("/users/authenticate").send(user);
    expect(res.status).toBe(401);
    expect(res.body).toBe("Invalid Credentials provided");
  });

  it("should get user information", async () => {
    const credentials = { firstname: "Steve", password: "password" };
    const authRes = await request(app)
      .post("/users/authenticate")
      .send(credentials);
    const user = await new User().getUserFromJWT(authRes.body);
    const res = await request(app)
      .get(`/users/${user.id}`)
      .set("Authorization", `Bearer ${authRes.body}`);
    expect(res.body.id).toEqual(user.id);
    expect(res.body.firstname).toEqual(user.firstname);
    expect(res.body.password).toEqual(user.password);
  });

  it("should get users list", async () => {
    const credentials = { firstname: "Steve", password: "password" };
    const authRes = await request(app)
      .post("/users/authenticate")
      .send(credentials);
    const res = await request(app)
      .get(`/users`)
      .set("Authorization", `Bearer ${authRes.body}`);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
