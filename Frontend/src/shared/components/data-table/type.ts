import type { ReactNode } from "react";

export interface Column<T> {
  header: string;
  cell: (row: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];

  currentPage: number;
  totalPages: number;
  totalItems: number;

  onPageChange: (page: number) => void;
}