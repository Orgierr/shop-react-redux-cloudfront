import { APIGatewayProxyHandler } from "aws-lambda";
import { products } from "../common/products";

export const getProductsList: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};
