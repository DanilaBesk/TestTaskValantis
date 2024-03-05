import { ArrowLeft } from "lucide-react";
import styles from "./pagination.module.css";

interface PaginationPrevProps {
  onClick: () => void;
  disabled: boolean;
}

export const PaginationPrev = ({ onClick, disabled }: PaginationPrevProps) => {
  return (
    <button
      className={`${styles.item} ${disabled && styles.disabled}`}
      disabled={disabled}
      onClick={onClick}
    >
      <ArrowLeft className={styles.arrow} />
    </button>
  );
};
