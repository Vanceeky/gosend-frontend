"use client"

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



const InactiveAccounts = () => {
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState("");

  React.useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
    fetch(`http://${API_BASE_URL}:8000/v1/users/activation_status/?is_activated=false`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.error("Expected array but received:", data);
          setData([]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Memoize filteredData to avoid unnecessary recalculations
  const filteredData = React.useMemo(() => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.mobile_number.includes(filterValue)
    );
  }, [data, filterValue]);

  const columns = [
    {
      accessorKey: "mobile_number",
      header: "Mobile Number",
      cell: ({ row }) => <div className="text-left font-medium">{row.getValue("mobile_number")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Name <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "community_name",
      header: "Community",
      cell: ({ row }) => <div className="capitalize">{row.getValue("community_name")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={(e) => e.preventDefault()} // Prevent default behavior
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.user_id)}>
                Copy User ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>                
                {/* Use Link to navigate to the user details page */}
                <Link to={`/v1/users/${user.user_id}`} className="w-full">
                  View Profile
                </Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 p-4">
          <Card className="p-3">

            <div className="flex items-center py-4">
              <Input
                placeholder="Filter members by name or mobile number..."
                value={filterValue}
                onChange={(event) => setFilterValue(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent form submission on Enter
                  }
                }}
                className="max-w-sm"
              />
            </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                      {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                          </TableCell>
                        </TableRow>
                      )}
                  </TableBody>
                </Table>
              </div>
              {/* Pagination Controls */}
              <div className="flex items-center justify-end space-x-2 py-4">
                {/* Page Size Dropdown */}
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                      value={`${table.getState().pagination.pageSize}`}
                      onValueChange={(value) => table.setPageSize(Number(value))}
                    >
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Previous and Next Buttons */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
              </div>

          </Card>
        </div>
      </div>
    </div>
  );
};

export default InactiveAccounts;