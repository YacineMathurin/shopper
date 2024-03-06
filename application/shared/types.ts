export type LastEvaluatedKey = {
  primaryKey: string;
  sortKey: string;
};

export type SaveProduct = {
  sellerId: string;
  name: string;
  description: string;
  price: string;
  savedImageObj: {link: string};
};
