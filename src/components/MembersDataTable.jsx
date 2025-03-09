import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import ConfirmActivation from "@/components/ConfirmActivation";
import { Link } from "react-router-dom";



export default function MembersDataTable({ data = [], onActivate }) {
  const [search, setSearch] = useState("");
  const [kycFilter, setKycFilter] = useState(null);
  const [activatedFilter, setActivatedFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 5;

  if (!Array.isArray(data)) {
    console.error("DataTable received invalid data:", data);
    return <p className="text-red-500">Error: Invalid data format</p>;
  }

  // Filtered data based on search and select filters
  const filteredData = data
    .filter((item) => item.mobile_number?.includes(search))
    .filter((item) => (kycFilter !== null ? item.is_kyc_verified === kycFilter : true))
    .filter((item) => (activatedFilter !== null ? item.is_activated === activatedFilter : true));

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleActivateSuccess = (userId) => {
    onActivate(userId); // Call parent function to update state
  };


  

  return (
    <Card className="p-6 space-y-4 shadow-md">
      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Search Input */}
        <Input
          className="w-[250px]"
          placeholder="Search by Mobile Number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* KYC Filter */}
        <Select
          value={kycFilter !== null ? String(kycFilter) : "all"}
          onValueChange={(value) => {
            const newValue = value === "all" ? null : value === "true";
            setKycFilter(newValue);
          }}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="KYC Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">KYC</SelectItem>
            <SelectItem value="true">Verified</SelectItem>
            <SelectItem value="false">Not Verified</SelectItem>
          </SelectContent>
        </Select>

        {/* Activation Filter */}
        <Select
          value={activatedFilter !== null ? String(activatedFilter) : "all"}
          onValueChange={(value) => {
            const newValue = value === "all" ? null : value === "true";
            setActivatedFilter(newValue);
          }}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Activation Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Is Activated</SelectItem>
            <SelectItem value="true">Activated</SelectItem>
            <SelectItem value="false">Not Activated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-auto h-[60vh] border rounded-lg">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Wallet Balance</TableHead>
              <TableHead>Reward Points</TableHead>
              <TableHead>Account Type</TableHead>
              <TableHead>Community Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>KYC Verified</TableHead>
              <TableHead>Activated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((user) => (
                <TableRow key={user.id}>
                  {/* Avatar + Name */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {user.name}
                    </div>
                  </TableCell>

                  <TableCell>{user.mobile_number}</TableCell>
                  <TableCell>₱{user.wallet_balance}</TableCell>
                  <TableCell>{user.reward_points}</TableCell>
                  <TableCell>{user.account_type}</TableCell>
                  <TableCell>{user.community_name}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.is_kyc_verified ? "✅ Yes" : "❌ No"}</TableCell>
                  <TableCell>{user.is_activated ? "✅ Yes" : "❌ No"}</TableCell>

                  {/* Actions Dropdown */}
                  <TableCell>
                    
                    <DropdownMenu>

                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* Activate Account if not activated */}
                        {!user.is_activated && (
                          <ConfirmActivation
                            title="Activate Account?"
                            description=""
                            onConfirm={() => onActivate(user.id)}
                            triggerText="Activate Account"
                            user={user}
                            onActivateSuccess={handleActivateSuccess} 
                          />

                        )}

                        <DropdownMenuSeparator />
                        
                        {/* Copy KYC URL if not verified */}
                        {!user.is_kyc_verified && (
                          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.kyc_url)}>
                            Copy KYC URL
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          {/* Use Link to navigate to the user details page */}
                          <Link to={`/dashboard/member/${user.user_id}`} className="w-full">
                            View Details
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="10" className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
