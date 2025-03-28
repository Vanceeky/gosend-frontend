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
import AddCommunityDialog from "@/components/AddCommunityDialog";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie"


export default function Community() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const accountType = Cookies.get("account_type");
  // Fetch Data from API
  const fetchCommunities = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
      const response = await fetch(`http://${API_BASE_URL}/v1/community/all`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
  
      if (result.status === "success") {
        const formattedData = result.data.map((item) => ({
          id: item.community_id,
          name: item.community_name,
          leader: item.leader_name,
          members: item.total_members,
          points: item.reward_points,
        }));
        setData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching communities:", error);
    }
  };
  
  // Fetch communities on mount
  useEffect(() => {
    fetchCommunities();
  }, []);
  

  // Filtered Data for Search
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="p-6 space-y-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Community</h2>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search Community..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80"
        />

        {accountType == "ADMIN" && (
          
        <AddCommunityDialog onCommunityAdded={() => fetchCommunities()} />
        )}

      </div>

      {/* Table */}
      <div className="overflow-auto h-[60vh] border rounded-lg">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Community Name</TableHead>
              <TableHead>Leader Name</TableHead>
              <TableHead>Total Members</TableHead>
              <TableHead>Reward Points</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.leader}</TableCell>
                  <TableCell>{item.members}</TableCell>
                  <TableCell>{item.points}</TableCell>
                  
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {accountType == "ADMIN" && (
                            <DropdownMenuItem
                            onClick={() =>
                              navigate(`/dashboard/community/${item.id}`)
                            }
                          >

                          
                            View Details
                          </DropdownMenuItem>
                          )}

                          {accountType == "CUSTOMER_SUPPORT" && (
                            <DropdownMenuItem
                            onClick={() =>
                              navigate(`/customer-support/community/${item.id}`)
                            }
                          >
                          
                            View Details
                          </DropdownMenuItem>
                          )}  

                          {accountType == "INVESTOR" && (
                            <DropdownMenuItem
                            onClick={() =>
                              navigate(`/investor/community/${item.id}`)
                            }
                          >
                            View Details
                          </DropdownMenuItem>
                          )}

                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-4 text-gray-500"
                >
                  No communities found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 p-3 flex items-center justify-between">
        <span>
          Page {currentPage} of {totalPages || 1}
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
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
