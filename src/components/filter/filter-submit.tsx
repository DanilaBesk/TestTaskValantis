import { Search } from "lucide-react";
import styles from "./filter.module.css";

export const FilterSubmit = () => {
  return (
    <button
      type="submit"
      className={`${styles.buttonSearch} ${styles.formElement}`}
    >
      <Search color="black" />
    </button>
  );
};
