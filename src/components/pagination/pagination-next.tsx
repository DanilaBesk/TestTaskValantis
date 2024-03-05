import { ArrowRight } from "lucide-react";
import styles from "./pagination.module.css";

interface PaginationNextProps {
  onClick: () => void;
  disabled: boolean;
}

export const PaginationNext = ({ onClick, disabled }: PaginationNextProps) => {
  return (
    <button
      className={`${styles.item} ${disabled && styles.disabled}`}
      disabled={disabled}
      onClick={onClick}
    >
      <ArrowRight className={styles.arrow} />
    </button>
  );
};
