import { TFields } from "../../types/product";
import styles from "./filter.module.css";

interface FilterInputProps {
  filterValue: TFields | null;
  inputValue: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const PLACEHOLDER_TEXT = {
  brand: "Введите название бренда",
  price: "Введите цену товара",
  product: "Введите название товара",
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
      className={`${styles.formElement} ${filterValue ? "" : styles.forbidden}`}
      type={filterValue === "price" ? "number" : "text"}
      disabled={!filterValue}
      value={!filterValue ? "" : inputValue}
      onChange={onChange}
      placeholder={filterValue ? PLACEHOLDER_TEXT[filterValue] : "Без фильтра"}
    />
  );
};
