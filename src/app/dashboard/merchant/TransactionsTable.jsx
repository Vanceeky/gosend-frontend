import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { format, parseISO, isValid } from "date-fns";
import { Calendar as CalendarIcon, Eraser } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { merchant_id } = useParams()
  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop().split(";").shift();
      console.log(`${name}:`, cookieValue);
      return cookieValue;
    }
    console.log(`Cookie "${name}" not found.`);
    return null;
  };
  
  // Example
  getCookie("access_token");
  getCookie("account_type")

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
    
        const response = await fetch(`http://${API_BASE_URL}/v1/merchant/purchase/history/${merchant_id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Accept": "application/json",
          }
        });

 
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Unauthorized");
        }
    
        const data = await response.json();
        setTransactions(data.data?.purchases || []);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };
    
  
    fetchTransactions();
  }, []);
  

  const clearDateRange = () => setDateRange({ from: null, to: null });

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.name.toLowerCase().includes(search.toLowerCase()) || txn.reference_id.toLowerCase().includes(search.toLowerCase());

    const txnDate = parseISO(txn.purchase_date);
    const withinDateRange =
      (!dateRange.from || (isValid(txnDate) && txnDate >= dateRange.from)) &&
      (!dateRange.to || (isValid(txnDate) && txnDate <= dateRange.to));

    const matchesStatus = statusFilter === "" || txn.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && withinDateRange && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedData = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getInitials = (name) => {
    const words = name.split(" ");
    return words.length > 1
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
      : words[0][0].toUpperCase();
  };

  return (
    <Card class="p-2">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

      <div className="mb-4 flex items-center gap-4">
        <Input
          placeholder="Search by customer or reference ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 p-2 border rounded-md"
        />

        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full md:w-[300px] justify-start text-left font-normal", !dateRange.from && !dateRange.to && "text-muted-foreground")}>              
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from && dateRange.to ? `${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}` : "Pick a date range"}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={1} />
          </PopoverContent>
        </Popover>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={clearDateRange} className="flex items-center justify-center w-full md:w-[50px]">
              <Eraser className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear Date Range</TooltipContent>
        </Tooltip>

      </div>

      <div className="overflow-auto h-[63vh] border rounded-lg">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Reference ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((txn) => (
              <TableRow key={txn.purchase_id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{getInitials(txn.name)}</AvatarFallback>
                  </Avatar>
                  {txn.name}
                </TableCell>
                <TableCell>₱ {txn.amount}</TableCell>
                <TableCell>{txn.reference_id}</TableCell>
                <TableCell>{txn.status.toUpperCase()}</TableCell>
                <TableCell>{format(parseISO(txn.purchase_date), "MM-dd-yyyy HH:mm:ss")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 p-3 flex items-center justify-between">
        <span>Page {totalPages > 0 ? currentPage : 0} of {totalPages || 1}</span>
        <div className="flex gap-2">
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</Button>
          <Button onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))} disabled={currentPage >= totalPages}>Next</Button>
        </div>
      </div>
    </Card>
  );
};

export default Transactions;
