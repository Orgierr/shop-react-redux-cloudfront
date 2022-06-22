export class ProductService {
  static async findAll(products: Product[]) {
    return products;
  }
  static async findById(products: Product[], productId: string) {
    return products.find((e) => e.id === productId);
  }
}
