import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { format, parseISO, isValid } from "date-fns";

// Updated transactions array with "name" field
const transactions = [
  { id: "TXN12345", name: "John Doe", date: "2025-03-12", amount: "$150.00", status: "Completed" },
  { id: "TXN67890", name: "Jane Smith", date: "2025-03-11", amount: "$200.00", status: "Pending" },
  { id: "TXN54321", name: "Alice Johnson", date: "2025-03-10", amount: "$75.00", status: "Completed" },
  { id: "TXN78901", name: "Bob Williams", date: "2025-03-09", amount: "$300.00", status: "Failed" },
];

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const clearDateRange = () => setDateRange({ from: null, to: null });

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.id.toLowerCase().includes(search.toLowerCase()) ||
      txn.name.toLowerCase().includes(search.toLowerCase()) ||
      txn.amount.includes(search) ||
      txn.status.toLowerCase().includes(search.toLowerCase()) ||
      txn.date.includes(search);

    const txnDate = parseISO(txn.date);
    const withinDateRange =
      (!dateRange.from || (isValid(txnDate) && txnDate >= dateRange.from)) &&
      (!dateRange.to || (isValid(txnDate) && txnDate <= dateRange.to));

    const matchesStatus = statusFilter === "" || txn.status === statusFilter;

    return matchesSearch && withinDateRange && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedData = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="p-6 space-y-4 shadow-md">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

        <div className="mb-4 flex items-center gap-4">
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3 p-2 border rounded-md"
          />

          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-1/3 flex justify-between items-center">
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
                  : "Select Date Range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={1} />
            </PopoverContent>
          </Popover>
          
          <Button variant="destructive" onClick={clearDateRange} disabled={!dateRange.from && !dateRange.to}>
            Clear Date
          </Button>
        
        {/* Switched positions: Status Filter appears before Clear Date now */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {statusFilter ? `Status: ${statusFilter}` : "Filter by Status"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Failed")}>Failed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("")}>Clear Filter</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>

        <div className="overflow-auto h-[63vh] border rounded-lg">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{txn.id}</TableCell>
                    <TableCell>{txn.name}</TableCell>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>{txn.amount}</TableCell>
                    <TableCell>{txn.status}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center p-4">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 p-3 flex items-center justify-between">
          <span>
            Page {totalPages > 0 ? currentPage : 0} of {totalPages || 1}
          </span>
          <div className="flex gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={currentPage >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Transactions;
