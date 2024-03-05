import { useState } from "react";
import { TFields } from "../../types/product";
import { FilterInput } from "./filter-input";
import { FilterLabel } from "./filter-label";
import { FilterSelect } from "./filter-select";
import { FilterSubmit } from "./filter-submit";
import styles from "./filter.module.css";

interface FilterProps {
  setSearchParams: (params: {
    filterValue: TFields | "none";
    inputValue: string;
  }) => void;
}

export const Filter = ({ setSearchParams }: FilterProps) => {
  const [filterValue, setFilterValue] = useState<TFields | "none">("none");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ filterValue, inputValue });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      ["brand", "price", "product", "none"].includes(e.target.value as TFields)
    )
      setFilterValue(e.target.value as TFields);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.filter}>
      <div className={styles.selectWrapper}>
        <FilterLabel htmlFor="filter-select">Фильтр:</FilterLabel>
        <FilterSelect
          id="filter-select"
          onChange={handleSelectChange}
          filterValue={filterValue}
        />
      </div>
      <div className={styles.searchWrapper}>
        <div className={styles.inputWrapper}>
          <FilterLabel htmlFor="filter-input">Ввод:</FilterLabel>
          <FilterInput
            id="filter-input"
            inputValue={filterValue === "none" ? "" : inputValue}
            onChange={handleInputChange}
            filterValue={filterValue}
          />
        </div>
        <FilterSubmit />
      </div>
    </form>
  );
};
