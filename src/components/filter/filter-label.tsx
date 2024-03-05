import styles from "./filter.module.css";

interface FilterLabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

export const FilterLabel = ({ children, htmlFor }: FilterLabelProps) => {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {children}
    </label>
  );
};
