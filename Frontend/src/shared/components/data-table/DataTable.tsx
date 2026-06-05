import { Button } from "@/shared/components/ui/button";

import type { DataTableProps } from "./type";

export function DataTable<T>({ columns, data, currentPage, totalPages, totalItems, onPageChange, }: DataTableProps<T>) {
    return (
        <div className="rounded-lg border border-border/50 bg-card/50 overflow-hidden">

            <div className="overflow-x-auto">
                <table className="w-full">

                    <thead>
                        <tr className="border-b border-border/50 bg-muted/30">
                            {columns.map((column) => (
                                <th
                                    key={column.header}
                                    className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-border/50">
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className="hover:bg-muted/20 transition-colors"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.header}
                                        className="px-6 py-4"
                                    >
                                        {column.cell(row)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            <div className="border-t border-border/50 px-6 py-4 flex items-center justify-between">

                <p className="text-sm text-muted-foreground">
                    Showing {totalItems} items
                </p>

                <div className="flex gap-2">

                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() =>
                            onPageChange(currentPage - 1)
                        }
                    >
                        Previous
                    </Button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((pageNumber) => (
                        <Button
                            key={pageNumber}
                            size="sm"
                            variant={
                                currentPage === pageNumber
                                    ? "default"
                                    : "outline"
                            }
                            style={
                                currentPage === pageNumber
                                    ? {
                                        backgroundColor: "#00D084",
                                        color: "black",
                                    }
                                    : {}
                            }
                            onClick={() =>
                                onPageChange(pageNumber)
                            }
                        >
                            {pageNumber}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        disabled={
                            currentPage === totalPages
                        }
                        onClick={() =>
                            onPageChange(currentPage + 1)
                        }
                    >
                        Next
                    </Button>

                </div>
            </div>

        </div>
    );
}