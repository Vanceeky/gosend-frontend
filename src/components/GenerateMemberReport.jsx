import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Download } from "lucide-react";
  import { useState } from "react";
  import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
  import * as XLSX from "xlsx";
  
  export default function GenerateMemberReport({ data }) {
    const [filter, setFilter] = useState("all"); // State to hold filter value
    const [fileName, setFileName] = useState(""); // State to hold file name input
    const [loading, setLoading] = useState(false); // Loading state to show when generating report
  
    const handleDownload = () => {
      // Set loading to true when the report is being generated
      setLoading(true);
  
      // Filter data based on the selected filter
      let filteredData = [];
      if (filter === "activated") {
        filteredData = data.filter((member) => member.activated);
      } else if (filter === "not_activated") {
        filteredData = data.filter((member) => !member.activated);
      } else {
        filteredData = data; // All members
      }
  
      if (!filteredData || filteredData.length === 0) {
        alert("No data to export.");
        setLoading(false);
        return;
      }
  
      // Default file name generation if not provided
      const filterName = filter === "all" ? "All" : filter === "activated" ? "Activated" : "Not_Activated";
      const generatedFileName = fileName || `members_report_${filterName}_${new Date().toISOString().slice(0, 19).replace("T", "_").replace(/:/g, "-")}.xlsx`;
  
      const worksheetData = filteredData.map((member) => ({
        Name: `${member.first_name} ${member.last_name}`,
        "Mobile Number": member.mobile,
        "Reward Points": member.reward_points,
        "Account Type": member.account_type,
        "Community Name": member.community,
        Address: `${member.house_number || ""} ${member.street_name || ""} ${member.barangay || ""} ${member.city || ""} ${member.province || ""} ${member.region || ""}`,
        "KYC Verified": member.is_kyc_verified ? "Yes" : "No",
        Activated: member.is_activated ? "Yes" : "No",
        "Date Registered": new Date(member.dateRegistered).toLocaleString(),
      }));

      
  
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
  
      // Generate the file
      XLSX.writeFile(workbook, generatedFileName);
  
      // Set loading to false once the file has been generated
      setLoading(false);
    };
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
            <Download size={16} /> Generate Report
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Member Report</DialogTitle>
          </DialogHeader>
  
          <div className="text-sm text-gray-600 my-4">
            This will generate a report based on the currently displayed members, including filters applied.
          </div>
  
          {/* Filter Dropdown (ShadCN Select) */}
          <div className="mb-4">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
              Select Members to Generate Report
            </label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                <SelectItem value="activated">Activated Members</SelectItem>
                <SelectItem value="not_activated">Not Activated Members</SelectItem>
              </SelectContent>
            </Select>
          </div>
  
          {/* File Name Input (ShadCN Input) */}
          <div className="mb-4">
            <label htmlFor="fileName" className="block text-sm font-medium text-gray-700">
              Enter File Name (Optional)
            </label>
            <Input
              type="text"
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter a file name"
              className="mt-1 w-full"
            />
          </div>
  
          <DialogFooter>
            <Button onClick={handleDownload} className="w-full cursor-pointer" disabled={loading}>
              {loading ? "Generating..." : "Download Excel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  