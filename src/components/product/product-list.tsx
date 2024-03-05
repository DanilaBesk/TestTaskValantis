import { TProduct } from "../../types/product";
import { ProductItem } from "./product-item";
import styles from "./product.module.css";

interface ProductListProps {
  products: TProduct[];
  offset: number;
}

export const ProductList = ({ products, offset }: ProductListProps) => {
  if (products.length === 0) {
    return <div className={styles.notFound}>Ничего не найдено</div>;
  }
  return (
    <ul className={styles.list}>
      {products.map((item, index) => (
        <ProductItem
          order={offset + index + 1}
          key={item.id}
          brand={item.brand}
          id={item.id}
          price={item.price}
          product={item.product}
        />
      ))}
    </ul>
  );
};
