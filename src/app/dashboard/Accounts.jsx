import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

import AddAccountDialog from "./AddAccountDialog";



export default function Accounts() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch Data from API
  const fetchAccounts = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
      const response = await fetch(`http://${API_BASE_URL}/v1/admin/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const result = await response.json();
  
      if (Array.isArray(result)) {
        const formattedData = result.map((item) => ({
          id: item.id,
          username: item.username,
          mobile_number: item.mobile_number,
          account_type: item.account_type,
          account_url: item.account_url,
        }));
        setData(formattedData);
      } else {
        console.error("Unexpected response format:", result);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error.message || error);
    }
  };
  
  // Fetch accounts on mount
  useEffect(() => {
    fetchAccounts();
  }, []);
  


  return (
    <Card className="p-6 space-y-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Accounts</h2>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80"
        />



        {/* Add Community Dialog */}
        <AddAccountDialog onAccountAdded={() => fetchAccounts()} />




      </div>

        <div className="overflow-auto h-[60vh] border rounded-lg">
            <Table>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                    <TableHead>Account Type</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Mobile Number</TableHead>
                    <TableHead>Account URL</TableHead>
                    <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.account_type}</TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.mobile_number}</TableCell>
                        <TableCell>
                        <a href={`/${item.account_url}/login`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                            {item.account_url}
                        </a>
                        </TableCell>
                        <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => navigate(`/dashboard/community/${item.id}`)}
                            >
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>


    </Card>
  );
}
