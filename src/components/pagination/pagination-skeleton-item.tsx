import styles from "./pagination.module.css";

export const PaginationSkeletonItem = () => {
  return (
    <div className={`${styles.item} animation-pulse ${styles.disabled}`}></div>
  );
};
