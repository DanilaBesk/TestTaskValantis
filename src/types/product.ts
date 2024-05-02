export type TFields = "product" | "price" | "brand";

export type TProduct = {
  id: string;
  product: string;
  price: number;
  brand: string | null;
};
