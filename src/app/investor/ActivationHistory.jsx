import { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import DateRangePicker from "@/components/DatePickerWithRange";
import * as XLSX from "xlsx";
import { toast } from "sonner";  // Importing toast from Sonner


export default function ActivationHistory() {
  const [activations, setActivations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedActivation, setSelectedActivation] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error messages

  useEffect(() => {
    const fetchActivationHistory = async () => {
      try {
        const response = await fetch("http://localhost:8000/v1/reward/activation-history");
        if (!response.ok) {
          throw new Error("Failed to fetch activation history");
        }
        const data = await response.json();
        setActivations(data);
      } catch (error) {
        console.error("Error fetching activation history:", error);
      }
    };

    fetchActivationHistory();
  }, []);

  const filteredActivations = activations.filter((activation) =>
    activation.reference_id.toLowerCase().includes(search.toLowerCase()) ||
    activation.activated_member_name.toLowerCase().includes(search.toLowerCase())
  );

  
  const generateReport = () => {
    if (!dateRange.from || !dateRange.to) {
      toast.error("Please select a valid date range.");
      return;
    }
  
    // Simple filename validation: no special characters, non-empty
    if (fileName && /[^a-zA-Z0-9-_ ]/.test(fileName)) {
      toast.error("File name contains invalid characters.");
      return;
    }
  
    setIsLoading(true);
  
    const filteredData = activations.filter((activation) => {
      const activationDate = new Date(activation.activated_at);
      return (
        dateRange.from &&
        dateRange.to &&
        activationDate >= dateRange.from &&
        activationDate <= dateRange.to.setHours(23, 59, 59, 999)
      );
    });
  
    if (filteredData.length === 0) {
      toast.error("No activations found for the selected date range.");
      setIsLoading(false);
      return;
    }
  
    // Format date range as YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split("T")[0];
    const fromDate = formatDate(dateRange.from);
    const toDate = formatDate(dateRange.to);
  
    // Generate file name
    const finalFileName = fileName
      ? `${fileName}_${fromDate}_to_${toDate}.xlsx`
      : `activation_report_${fromDate}_to_${toDate}.xlsx`;
  
    // Generate the Excel file
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Activation History");
    XLSX.writeFile(wb, finalFileName);
  
    setIsLoading(false);
    setIsReportDialogOpen(false);
  
    toast.success(`Report "${finalFileName}" generated successfully!`);
  };
  
  

  return (
    <Card className="p-6 space-y-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Activation History</h2>

      {/* Search Input and Report Button */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search by reference ID or member name..."
          className="w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => setIsReportDialogOpen(true)}>Generate Report</Button>
      </div>

      {/* Table */}
      <div className="overflow-auto h-[60vh] border rounded-lg">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Member Name</TableHead>
              <TableHead>Reference ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className='text-center'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActivations.map((activation) => (
              <TableRow key={activation.activation_id}>
                <TableCell className='flex items-center'>
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {activation.activated_member_name
                        .split(' ')
                        .map(name => name.charAt(0).toUpperCase())
                        .slice(0, 2)
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Link to={`/dashboard/member/${activation.member_id}`} className="ml-2 hover:text-blue-500">
                    {activation.activated_member_name || 'N/A'}
                  </Link>
                </TableCell>
                <TableCell>{activation.reference_id || "N/A"}</TableCell>
                <TableCell>{activation.amount}</TableCell>
                <TableCell>{activation.status}</TableCell>
                <TableCell>{new Date(activation.activated_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedActivation(activation);
                          setIsDialogOpen(true);
                        }}
                      >
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Report Generation Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent>
          <DialogTitle>Generate Report</DialogTitle>
          <DialogDescription>Select a date range and filename for the report.</DialogDescription>
          <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          <Input placeholder="Enter file name (optional)" value={fileName} onChange={(e) => setFileName(e.target.value)} />
          
          {/* Display Error Message */}
          {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={generateReport}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
