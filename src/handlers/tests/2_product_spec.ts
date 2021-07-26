import request from "supertest";

import app from "../../server";

describe("Testing Product handlers", () => {
  let authToken: string;
  let newProduct: string;
  beforeAll(async () => {
    const credentials = { firstname: "Steve", password: "password" };
    const authRes = await request(app)
      .post("/users/authenticate")
      .send(credentials);
    authToken = authRes.body;
  });
  it("should check create endpoint", async () => {
    const data = { name: "Rainbow t-shirt", price: "50", category: "Clothes" };
    const res = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${authToken}`)
      .send(data);
    expect(res.status).toBe(200);
    newProduct = res.body.id;
    expect(res.body.name).toBe(data.name);
  });

  it("should check retrieve endpoint", async () => {
    const res = await request(app)
      .get(`/products/${newProduct}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(newProduct);
  });

  it("should check retrieve endpoint for all products", async () => {
    const res = await request(app).get(`/products`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
