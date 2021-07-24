import {} from "jasmine";
import { IOrder, Order } from "../order";
import { IUser, User } from "../user";
import { IProduct, Product } from "../product";

const order = new Order();

describe("Testing Order model methods", () => {
  it("should have an create method", () => {
    expect(order.create).toBeDefined();
  });
  it("should have an getUserOrders method", () => {
    expect(order.getUserOrders).toBeDefined();
  });
  it("should have an getCompletedUserOrders method", () => {
    expect(order.getCompletedUserOrders).toBeDefined();
  });

  describe("DB menipulation methods", () => {
    let user = new User();
    let product = new Product();

    let auth_token: string;
    let dummy_user: IUser;
    let dummy_product: IProduct;

    beforeAll(async () => {
      const data_user = {
        firstname: "Terry",
        lastname: "Crews",
        password: "password12345",
      };
      auth_token = await user.create(data_user);
      dummy_user = await user.getUserFromJWT(auth_token);
      const data_product = {
        name: "Samsung A51",
        price: "1000",
        category: "Electronics",
      };
      dummy_product = await product.create(data_product);
    });
    it("should create a new order", async () => {
      const data = {
        product_id: dummy_product.id,
        quantity: 5,
        user_id: dummy_user.id,
      };
      const result = await order.create(data as IOrder);
      expect(result.product_id).toBe(dummy_product.id as number);
      expect(result.user_id).toBe(dummy_user.id as number);
      expect(result.quantity).toBe(5);
    });
    it("should get orders for user", async () => {
      const result = await order.getUserOrders(
        dummy_user.id as unknown as string
      );
      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });
});
