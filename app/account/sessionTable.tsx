"use client";

import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Session } from "better-auth";
import * as React from "react";
import { RevokeAllSessionsButton } from "./revokeAllSessionsButton";
import { RevokeOtherSessionsButton } from "./revokeOtherSessionsButton copy";
import { RevokeSessionButton } from "./revokeSessionButton";
import { TableSortButton } from "./TableSortButton";

export type SessionRow = {
  isActive: boolean;
} & Session;

export const columns: ColumnDef<SessionRow>[] = [
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) =>
      row.getValue("isActive") ? (
        <span className="font-bold text-green-600">Active</span>
      ) : (
        <span className="text-gray-500">Inactive</span>
      ),
  },
  {
    accessorKey: "id",
    header: "Session ID",
    cell: ({ row }) => <div className="font-mono">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <TableSortButton
        label="Created At"
        sortDirection={column.getIsSorted()}
        toggleSorting={column.toggleSorting}
      />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue("createdAt")).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <TableSortButton
        label="Updated At"
        sortDirection={column.getIsSorted()}
        toggleSorting={column.toggleSorting}
      />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue("updatedAt")).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => (
      <TableSortButton
        label="Expires At"
        sortDirection={column.getIsSorted()}
        toggleSorting={column.toggleSorting}
      />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue("expiresAt")).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "token",
    header: "Token",
    cell: ({ row }) => <div>{row.getValue("token")}</div>,
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
    cell: ({ row }) => <div>{row.getValue("ipAddress") || "N/A"}</div>,
  },
  {
    accessorKey: "userAgent",
    header: "User Agent",
    cell: ({ row }) => <div>{row.getValue("userAgent") || "N/A"}</div>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <RevokeSessionButton token={row.getValue("token")} />,
  },
];
export type SessionTableProps = {
  sessions: SessionRow[];
};
export function SessionTable({ sessions }: SessionTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "updatedAt", desc: true },
  ]);
  const table = useReactTable({
    data: sessions,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="grid gap-2">
      <Label>Sessions</Label>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {sessions.some((s) => !s.isActive) ? (
        <RevokeOtherSessionsButton />
      ) : (
        <RevokeAllSessionsButton />
      )}
    </div>
  );
}
