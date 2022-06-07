import { APIGatewayProxyResult } from "aws-lambda";
import * as handler from "../handler";

const existId = {
  path: { productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa" },
};
const notExistId = {
  path: { productId: "7567ec4b-b10c-48c5-9345-fc73c48a801a" },
};

describe("Product Api test", () => {
  test("products", async () => {
    const res = (await handler.getProductsList()) as APIGatewayProxyResult;
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeNull();
  });
  test("product exist", async () => {
    const res = (await handler.getProductsById(
      existId
    )) as APIGatewayProxyResult;
    expect(res.statusCode).toEqual(200);
  });
  test("product not exist", async () => {
    const res = (await handler.getProductsById(
      notExistId
    )) as APIGatewayProxyResult;
    expect(res.statusCode).toEqual(404);
  });
});
