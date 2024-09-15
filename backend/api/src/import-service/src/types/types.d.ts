interface ServiceRes {
  statusCode: number;
  body: string;
  headers?: object;
}

interface QueryFileName {
  query: { fileName: string };
}

interface Product {
  count: number;
  description: string;
  id?: string;
  price: number;
  title: string;
}
