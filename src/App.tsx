import { useEffect, useState } from "react";
import { ProductList } from "./components/product/product-list";
import { Pagination } from "./components/pagination/pagination";
import { Filter } from "./components/filter/filter";
import { Loader } from "./components/loader/loader";
import styles from "./app.module.css";
import { TFields, TProduct } from "./types/product";
import { getIds } from "./api/products/get-ids";
import { getItems } from "./api/products/get-items";
import { ApiError } from "./lib/errors/api-error";
import { LIMIT_ITEMS_PER_PAGE } from "./lib/constants/pagination-settings";
import { filter } from "./api/products/filter";

import { useQuery, useQueryClient } from "@tanstack/react-query";

export const App = () => {
  const [page, setPage] = useState(1);

  const [{ filterValue, inputValue }, setSearchParams] = useState<{
    filterValue: TFields | "none";
    inputValue: string;
  }>({ filterValue: "none", inputValue: "" });

  const queryClient = useQueryClient();

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
      if (filterValue === "none") {
        try {
          const response = await getIds({ signal });
          return response.result;
        } catch (error) {
          handleError(error);
        }
      } else {
        let value: string | number | null = inputValue;
        if (filterValue === "price") {
          value = parseInt(inputValue);
        } else if (filterValue === "brand" && inputValue === "") {
          value = null;
        }

        try {
          const response = await filter({
            signal,
            params: { [filterValue]: value },
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
