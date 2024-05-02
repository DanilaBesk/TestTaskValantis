import { useState } from "react";
import { filter, getIds, getItems } from "./api/products";
import { Filter } from "./components/filter";
import { Loader } from "./components/loader";
import { Pagination } from "./components/pagination";
import { ProductList } from "./components/product";
import { LIMIT_ITEMS_PER_PAGE } from "./lib/constants/pagination-settings";
import { ApiError } from "./lib/errors";
import { TFields } from "./types/product";

import { useQuery } from "@tanstack/react-query";

import styles from "./app.module.css";
import { getCorrectInputValueType } from "lib/get-correct-input-value-type";

export const App = () => {
  const [page, setPage] = useState(1);

  const [{ filterValue, inputValue }, setSearchParams] = useState<{
    filterValue: TFields | null;
    inputValue: string;
  }>({ filterValue: null, inputValue: "" });

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      if (error instanceof ApiError) {
        console.error(
          `Api Error: \nStatus: ${error.status}\nMessage: ${error.message}\nId: ${error.id}`
        );
        throw error;
      } else if (error.name === "AbortError") {
        console.warn("Запрос отменен");
      } else {
        console.error(error);
      }
    }
  };

  const { data: ids, isLoading: isIdsLoading } = useQuery({
    queryKey: ["ids", filterValue, inputValue],
    queryFn: async ({ signal }) => {
      if (!filterValue) {
        try {
          const response = await getIds({ signal });
          return response.result;
        } catch (error) {
          handleError(error);
        }
      } else {
        try {
          const response = await filter({
            signal,
            params: {
              [filterValue]: getCorrectInputValueType(filterValue, inputValue),
            },
          });

          return response.result;
        } catch (error) {
          handleError(error);
        }
      }
      return null;
    },
  });

  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products", ids, page],
    enabled: !!ids,
    queryFn: async ({ signal }) => {
      try {
        if (!ids) {
          return null;
        }
        const offset = (page - 1) * LIMIT_ITEMS_PER_PAGE;

        //внутри происходит чистка дубликатов с конца (по условию)
        const response = await getItems({
          params: {
            ids: ids.slice(offset, LIMIT_ITEMS_PER_PAGE + offset),
          },
          signal,
          filter: {
            key: filterValue,
            value: getCorrectInputValueType(filterValue, inputValue),
          },
        });
        return response.result;
      } catch (error) {
        handleError(error);
      }
      return null;
    },
  });

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Поиск товаров</h1>
      <header className={styles.header}>
        <Filter
          setSearchParams={(params) => {
            setSearchParams(params);
            setPage(1);
          }}
        />
        {isIdsLoading || !ids ? (
          <Pagination.Skeleton />
        ) : (
          <Pagination
            disabled={ids.length === 0}
            total={Math.ceil(ids.length / LIMIT_ITEMS_PER_PAGE)}
            page={page}
            onPageClick={(page) => {
              setPage(page);
            }}
          />
        )}
      </header>
      <main className={styles.main}>
        {isProductsLoading || isIdsLoading || !products ? (
          <Loader width={60} height={60} position="center" />
        ) : (
          <ProductList
            offset={(page - 1) * LIMIT_ITEMS_PER_PAGE}
            products={products}
          />
        )}
      </main>
    </div>
  );
};
