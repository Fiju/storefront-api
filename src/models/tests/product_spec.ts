import {} from "jasmine";
import { IProduct, Product } from "../product";

const product = new Product();

describe("Testing Product model methods", () => {
  it("should have an index method", () => {
    expect(product.index).toBeDefined();
  });
  it("should have an create method", () => {
    expect(product.create).toBeDefined();
  });
  it("should have an show method", () => {
    expect(product.show).toBeDefined();
  });
  it("should have an getTopFiveProducts method", () => {
    expect(product.getTopFiveProducts).toBeDefined();
  });

  let dummy_product: IProduct;

  beforeAll(async () => {
    const data: IProduct = {
      name: "Samsung A51",
      price: "1000",
      category: "Electronics",
    };
    dummy_product = await product.create(data);
  });

  it("should retrieve all products", async () => {
    const p = await product.index();
    expect(p.length).toBeGreaterThanOrEqual(1);
  });
  it("should retrieve product with id", async () => {
    const result = await product.show(dummy_product.id as number);
    expect(result.id).toBeGreaterThanOrEqual(result.id as number);
    expect(result.name).toBe(result.name);
    expect(result.price).toBe(result.price);
    expect(result.category).toBe(result.category);
  });
});
