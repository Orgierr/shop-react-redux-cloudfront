import { products } from "../common/products";

export const getProductsList = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};
