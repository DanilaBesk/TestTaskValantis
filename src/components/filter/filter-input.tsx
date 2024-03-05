import { TFields } from "../../types/product";
import styles from "./filter.module.css";

interface FilterInputProps {
  filterValue: TFields | "none";
  inputValue: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const PLACEHOLDER_TEXT = {
  brand: "Введите название бренда",
  price: "Введите цену товара",
  product: "Введите название товара",
  none: "Без фильтра",
};

export const FilterInput = ({
  filterValue,
  inputValue,
  id,
  onChange,
}: FilterInputProps) => {
  return (
    <input
      id={id}
      className={`${styles.input} ${styles.formElement} ${
        filterValue === "none" && styles.forbidden
      }`}
      type={filterValue === "price" ? "number" : "text"}
      disabled={filterValue === "none"}
      value={inputValue}
      onChange={onChange}
      placeholder={PLACEHOLDER_TEXT[filterValue]}
    />
  );
};
