import {} from "jasmine";
import { IProduct, Product } from "../product";

const product = new Product();

describe("Testing Product model", () => {
  it("should have an index method", () => {
    expect(product.index).toBeDefined();
  });
  it("index should return a list of products", async () => {
    const result = await product.index();
    expect(result).toEqual([]);
  });
});
