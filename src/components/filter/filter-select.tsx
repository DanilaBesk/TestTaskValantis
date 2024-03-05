import { TFields } from "../../types/product";
import styles from "./filter.module.css";

interface FilterSelectProps {
  filterValue: TFields | "none";
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
}

export const FilterSelect = ({
  onChange,
  filterValue,
  id,
}: FilterSelectProps) => {
  return (
    <select
      id={id}
      className={`${styles.select} ${styles.formElement}`}
      value={filterValue}
      onChange={onChange}
    >
      <option value="none">Без фильтра</option>
      <option value="product">Название</option>
      <option value="price">Цена</option>
      <option value="brand">Бренд</option>
    </select>
  );
};
