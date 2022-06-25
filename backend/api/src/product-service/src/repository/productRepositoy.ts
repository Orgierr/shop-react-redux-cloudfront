import { StatusCodes } from 'http-status-codes';
import { QueryResult } from 'pg';
import { ServiceError } from '../errors/ServiceError';
import { pg } from '../pg/pg';

export class ProductRepository {
  static async findAll(): Promise<Product[]> {
    const client = pg();
    await client.connect();
    const products: QueryResult<Product> = await client.query(
      'select id,title,description,price,count from products join stocks on product_id=id',
    );
    await client.end();
    return products.rows;
  }
  static async findById(id: string): Promise<Product> {
    const client = pg();
    await client.connect();
    const products: QueryResult<Product> = await client.query(
      'select id,title,description,price,count from products join stocks on product_id=id where id=$1',
      [id],
    );
    await client.end();
    if (products.rows[0]) return products.rows[0];
    throw new ServiceError({
      statusCode: StatusCodes.NOT_FOUND,
      body: 'Product not found',
    });
  }
  static async create(newProduct: Product) {
    const client = pg();
    await client.connect();
    try {
      await client.query('BEGIN');
      await client.query(
        'insert into products(id,description,price,title) values($1,$2,$3,$4)',
        [
          newProduct.id,
          newProduct.description,
          newProduct.price,
          newProduct.title,
        ],
      );
      await client.query('insert into stocks(product_id,count) values($1,$2)', [
        newProduct.id,
        newProduct.count,
      ]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      await client.end();
    }
  }
}
