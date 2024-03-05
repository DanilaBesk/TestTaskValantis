import { formatCurrency } from "../../lib/format-currency";
import { TProduct } from "../../types/product";
import styles from "./product.module.css";

interface ProductItemProps extends TProduct {
  order: number;
}

export const ProductItem = ({
  id,
  brand,
  product,
  price,
  order,
}: ProductItemProps) => {
  return (
    <li className={styles.item}>
      <h3 className={styles.title}>{product}</h3>
      <div className={styles.main}>
        <p className={styles.brand}>Бренд: {brand || "не указан"}</p>
        <p className={styles.id}>id: {id}</p>
      </div>
      <div className={styles.footer}>
        <div className={styles.order}>{order}</div>
        <p className={styles.price}>{formatCurrency(price)}</p>
      </div>
    </li>
  );
};
