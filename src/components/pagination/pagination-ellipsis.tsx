import styles from "./pagination.module.css";

export const PaginationEllipsis = () => {
  return <div className={`${styles.item} ${styles.disabled}`}>...</div>;
};
