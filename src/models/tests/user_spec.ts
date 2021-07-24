import {} from "jasmine";
import { IUser, User } from "../user";

const user = new User();

describe("Testing User model methods", () => {
  it("should have an index method", () => {
    expect(user.index).toBeDefined();
  });
  it("should have an create method", () => {
    expect(user.create).toBeDefined();
  });
  it("should have an show method", () => {
    expect(user.show).toBeDefined();
  });
  it("should have an authenticate method", () => {
    expect(user.authenticate).toBeDefined();
  });
  it("should have an remove method", () => {
    expect(user.remove).toBeDefined();
  });
  it("should create a new user and give back its JWT", async () => {
    const data = {
      firstname: "Terry",
      lastname: "Crews",
      password: "password12345",
    };
    const result = await user.create(data);
    expect(result).toBeDefined();
  });
  it("should get all users", async () => {
    const result = await user.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});

describe("Testing User model manipulative methods", () => {
  let dummy_user: IUser;
  beforeAll(async () => {
    const data = {
      firstname: "Bruno",
      lastname: "Mars",
      password: "password12345",
    };
    const token = await user.create(data);
    dummy_user = await user.getUserFromJWT(token);
  });
  it("get the last created user", async () => {
    const result = await user.show(String(dummy_user.id));
    expect(result.firstname).toBe("Bruno");
  });
  it("should get all users", async () => {
    const result = await user.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
