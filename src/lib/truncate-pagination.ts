type paginationItem = {
  type: "ellipsis" | "page";
  page: number;
  isActive: boolean;
};

interface truncatePaginationProps {
  current: number;
  total: number;
}
export function truncatePagination({
  current,
  total,
}: truncatePaginationProps): paginationItem[] {
  let result: paginationItem[] = [];

  if (total === 0) {
    return [{ isActive: false, page: 0, type: "page" }];
  }

  if (total <= 7)
    return Array.from({ length: total }).map((_, index) => ({
      type: "page",
      page: index + 1,
      isActive: current === index + 1,
    }));

  if (current <= 3) {
    result = Array.from({ length: 5 }).map((_, index) => ({
      type: "page",
      page: index + 1,
      isActive: current === index + 1,
    }));
    result.push({ type: "ellipsis", page: 0, isActive: false });
    result.push({
      type: "page",
      page: result[4].page >= total ? total : result[4].page + 10,
      isActive: false,
    });
  } else if (current >= total - 3) {
    result = Array.from({ length: 5 }).map((_, index) => ({
      type: "page",
      page: total - 4 + index,
      isActive: total - 4 + index === current,
    }));
    result.unshift({ type: "ellipsis", page: 0, isActive: false });
    result.unshift({
      type: "page",
      page: result[1].page - 12 >= 1 ? result[1].page - 12 : 1,
      isActive: false,
    });
  } else {
    result = Array.from({ length: 5 }).map((_, index) => ({
      type: "page",
      page: current - 2 + index,
      isActive: current - 2 + index === current,
    }));
    result.unshift({ type: "ellipsis", page: 0, isActive: false });
    result.push({ type: "ellipsis", page: 0, isActive: false });
    result.unshift({
      type: "page",
      page: current - 12 >= 1 ? current - 12 : 1,
      isActive: false,
    });
    result.push({
      type: "page",
      page: current + 12 <= total ? current + 12 : total,
      isActive: false,
    });
  }
  return result;
}
