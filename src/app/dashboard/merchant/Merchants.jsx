import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MerchantRegisterForm } from "@/components/merchant-reg-form";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
        const response = await fetch(`http://${API_BASE_URL}/v1/merchants/`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
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


  const getInitials = (name) => {
    const words = name.split(" ");
    return words.length > 1
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
      : words[0][0].toUpperCase();
  };
  
  return (
    <Card className="p-6 space-y-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Merchants</h2>

      <div className="flex flex-wrap items-center gap-4">
        {/* Search Input */}
        <Input
          className="w-[250px]"
          placeholder="Search by Mobile Number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Merchant</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
              <MerchantRegisterForm />
          </DialogContent>
        </Dialog>
          */}

      </div>

      {/* Table */}
      <div className="overflow-auto h-[63vh] border rounded-lg">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>

              <TableHead>Manager</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Business Name</TableHead>
              <TableHead>Business Type</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((merchant, index) => (
                <TableRow key={index}>

                <TableCell className="flex items-center gap-2">

                      <Avatar>
                        <AvatarFallback>{getInitials(merchant.manager)}</AvatarFallback>
                      </Avatar>

                      <Tooltip>
                        <TooltipTrigger>
                          <Link
                          to={`${merchant.merchant_id}`}
                          className="font-semibold hover:underline"
                          >
                          {merchant.manager}
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Merchant Profile</p>
                        </TooltipContent>
                      </Tooltip>

                </TableCell>



                  <TableCell>{merchant.mobile_number}</TableCell>
                  <TableCell>{merchant.business_name}</TableCell>
                  <TableCell>{merchant.business_type}</TableCell>
                  <TableCell>{merchant.discount}%</TableCell>
                  <TableCell>
                    {merchant.details ? (
                      <>
                        {merchant.details.street}, {merchant.details.barangay},{" "}
                        {merchant.details.municipality_city}, {merchant.details.province}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {merchant.merchant_details?.[0]?.latitude},{" "}
                    {merchant.merchant_details?.[0]?.longitude}
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
