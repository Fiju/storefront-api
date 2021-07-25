import request from "supertest";
import { User } from "../../models/user";

import app from "../../server";

describe("Testing Order handlers", () => {
  let authToken: string;

  beforeAll(async () => {
    const credentials = { firstname: "Steve", password: "password" };
    const authRes = await request(app)
      .post("/users/authenticate")
      .send(credentials);
    authToken = authRes.body;
  });

  it("should check create endpoint", async () => {
    const data = { products: [{ id: 1, quantity: 30 }] };
    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${authToken}`)
      .send(data);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it("should check user orders endpoint", async () => {
    const user = await new User().getUserFromJWT(authToken);
    const res = await request(app)
      .get("/orders/" + user.id)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
