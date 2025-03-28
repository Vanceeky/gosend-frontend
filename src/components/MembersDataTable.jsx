import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import ConfirmActivation from "@/components/ConfirmActivation";
import { Link } from "react-router-dom";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Cookies from "js-cookie";



export default function MembersDataTable({ data = [], onActivate }) {
  const [search, setSearch] = useState("");
  const [kycFilter, setKycFilter] = useState(null);
  const [activatedFilter, setActivatedFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const accountType = Cookies.get("account_type"); // Retrieve the account type from cookies

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

  console.log("User Data:", data); // 🔍 Debugging log

  
  return (
    <Card className="p-6 space-y-4 shadow-md max-w-[1140px]">
      <h2 className="text-2xl font-bold mb-4">Members</h2>

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
            <SelectItem value="all">Activation Status</SelectItem>
            <SelectItem value="true">Activated</SelectItem>
            <SelectItem value="false">Not Activated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table Container */}
      {/* Responsive Table */}
      <div className="overflow-x-auto h-[60vh]">
        <Table className="min-w-[1500px]">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Reward Points</TableHead>
              <TableHead>Account Type</TableHead>
              <TableHead>Community Name</TableHead>
              <TableHead>KYC Verified</TableHead>
              <TableHead>Activated</TableHead>
              <TableHead></TableHead>
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
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .slice(0, 2)
                            .map((word) => word.charAt(0))
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                        <Tooltip>
                          <TooltipTrigger>
                            { accountType === "INVESTOR" && (
                              <Link to={`/investor/member/${user.id}`} className="w-full hover:text-blue-500">
                              {user.name || "N/A"}
                              </Link>
                            )}

                            { accountType === "ADMIN" && (
                              <Link to={`/dashboard/member/${user.id}`} className="w-full hover:text-blue-500">
                              {user.name || "N/A"}
                              </Link>
                            )}  
                            { accountType === "CUSTOMER_SUPPORT" && (
                              <Link to={`/customer-support/member/${user.id}`} className="w-full hover:text-blue-500">
                              {user.name || "N/A"}
                              </Link>
                            )}  
                            
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Member Profile</p>
                          </TooltipContent>
                        </Tooltip>
                    </div>
                  </TableCell>

                  <TableCell>{user.mobile_number}</TableCell>
                  <TableCell>{user.reward_points}</TableCell>
                  <TableCell>{user.account_type}</TableCell>
                  {accountType === "ADMIN" && (
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                          <Link to={`/dashboard/community/${user.community_id}`} className="w-full hover:text-blue-500">
                                  {user.community_name || "N/A"}
                          </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Community</p>
                      </TooltipContent>
                    </Tooltip>

                  </TableCell>
                  )}

                  {accountType === "CUSTOMER_SUPPORT" && (
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                          <Link to={`/customer-support/community/${user.community_id}`} className="w-full hover:text-blue-500">
                                  {user.community_name || "N/A"}
                          </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Community</p>
                      </TooltipContent>
                    </Tooltip>

                  </TableCell>
                  )}

                  {accountType === "INVESTOR" && (
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                          <Link to={`/investor/community/${user.community_id}`} className="w-full hover:text-blue-500">
                                  {user.community_name || "N/A"}
                          </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Community</p>
                      </TooltipContent>
                    </Tooltip>

                  </TableCell>
                  )}

                  <TableCell>{user.is_kyc_verified ? "✅ Yes" : "❌ No"}</TableCell>
                  <TableCell>{user.is_activated ? "✅ Yes" : "❌ No"}</TableCell>

                      {(accountType === "ADMIN" || accountType === "CUSTOMER_SUPPORT") && (
                        <TableCell>
                          {/* Actions Dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>

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

                              {!user.is_kyc_verified && (
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.kyc_url)}>
                                  Copy KYC URL
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuItem>
                                <Link to={`/dashboard/member/${user.id}`} className="w-full">
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}


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