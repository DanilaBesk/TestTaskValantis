import styles from "./pagination.module.css";

interface PaginationItemProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  isCurrent?: boolean;
}

export const PaginationItem = ({
  onClick,
  disabled,
  children,
  isCurrent,
}: PaginationItemProps) => {
  return (
    <button
      disabled={disabled}
      className={`${styles.item} ${isCurrent && styles.current} ${
        disabled && styles.disabled
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
