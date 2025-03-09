import React, { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { MerchantRegisterForm } from "@/components/merchant-reg-form";


const Merchants = () => {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
        const response = await fetch(`http://${API_BASE_URL}:8000/v1/merchants/`);
        if (!response.ok) throw new Error("Failed to fetch merchants");

        const result = await response.json();
        setMerchants(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, []);

  const filteredMerchants = merchants.filter(merchant =>
    merchant.mobile_number.includes(search)
  );

  // Reset to first page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage);
  const paginatedData = filteredMerchants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <Card className="p-6 space-y-4 shadow-md">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search Input */}
        <Input
          className="w-[250px]"
          placeholder="Search by Mobile Number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Merchant</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
              <MerchantRegisterForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="overflow-auto h-[63vh] border rounded-lg">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Business Name</TableHead>
              <TableHead>Business Type</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Coordinates</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((merchant, index) => (
                <TableRow key={index}>
                  <TableCell>{merchant.mobile_number}</TableCell>
                  <TableCell>{merchant.business_name}</TableCell>
                  <TableCell>{merchant.business_type}</TableCell>
                  <TableCell>{merchant.discount}%</TableCell>
                  <TableCell>
                    {merchant.merchant_details?.[0] ? (
                      <>
                        {merchant.merchant_details[0].street},{" "}
                        {merchant.merchant_details[0].barangay},{" "}
                        {merchant.merchant_details[0].municipality_city},{" "}
                        {merchant.merchant_details[0].province}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {merchant.merchant_details?.[0]?.latitude},{" "}
                    {merchant.merchant_details?.[0]?.longitude}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center">
                  No merchants found.
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
    </Card>
  );
};

export default Merchants;
