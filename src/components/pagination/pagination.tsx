import { truncatePagination } from "../../lib/truncate-pagination";
import { PaginationEllipsis } from "./pagination-ellipsis";
import { PaginationItem } from "./pagination-item";
import { PaginationNext } from "./pagination-next";
import { PaginationPrev } from "./pagination-prev";
import { v4 as uuid } from "uuid";

import styles from "./pagination.module.css";
import { PaginationSkeletonItem } from "./pagination-skeleton-item";

interface PaginationProps {
  page: number;
  total: number;
  onPageClick: (page: number) => void;
  disabled: boolean;
}

export const Pagination = ({
  page,
  total,
  onPageClick,
  disabled,
}: PaginationProps) => {
  const pagination = truncatePagination({ current: page, total });

  return (
    <div className={styles.pagination}>
      <PaginationPrev
        disabled={page === 1 || disabled}
        onClick={() => onPageClick(page - 1)}
      />
      {pagination.map((item) => {
        if (item.type === "page")
          return (
            <PaginationItem
              key={uuid()}
              onClick={() => onPageClick(item.page)}
              disabled={disabled || item.isActive}
              isCurrent={item.isActive}
            >
              {item.page}
            </PaginationItem>
          );
        else if (item.type === "ellipsis")
          return <PaginationEllipsis key={uuid()} />;
        return <></>;
      })}

      <PaginationNext
        disabled={page === total || disabled}
        onClick={() => onPageClick(page + 1)}
      />
    </div>
  );
};

Pagination.Skeleton = () => (
  <div className={styles.pagination}>
    <PaginationSkeletonItem />
    <PaginationSkeletonItem />
    <PaginationSkeletonItem />
    <PaginationSkeletonItem />
    <PaginationSkeletonItem />
    <PaginationSkeletonItem />
    <PaginationSkeletonItem />
    <PaginationSkeletonItem />
    <PaginationSkeletonItem />
  </div>
);
