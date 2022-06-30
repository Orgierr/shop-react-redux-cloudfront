interface ServiceRes {
  statusCode: number;
  body: string;
  headers?: object;
}

interface QueryFileName {
  query: { fileName: string };
}
