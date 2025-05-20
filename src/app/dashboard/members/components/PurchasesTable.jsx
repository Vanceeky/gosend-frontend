import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useParams } from "react-router-dom";


const PurchasesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user_id } = useParams()

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8000/v1/member/merchant-purchase/history/${user_id}`, {
          method: "GET",
          "Content-Type": "application/json",
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok) {
          setPurchaseHistory(data); // Assuming the response is an array
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, []);

  // Filter the data based on the search term
  const filteredPurchaseHistory = purchaseHistory.filter((purchase) =>
    purchase.business_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPurchaseHistory.length / itemsPerPage);
  const paginatedData = filteredPurchaseHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getInitials = (name) => {
    const words = name.split(" ");
    return words.length > 1
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
      : words[0][0].toUpperCase();
};

  return (
    <>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by Merchant"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Merchant</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Reference ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Created</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((purchase) => (
              <TableRow key={purchase.purchase_id} className="cursor-pointer">
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{getInitials(purchase.business_name)}</AvatarFallback>
                  </Avatar>
                  {purchase.business_name}
                </TableCell>
                <TableCell>{purchase.amount}</TableCell>
                <TableCell>{purchase.reference_id}</TableCell>
                <TableCell>{purchase.status}</TableCell>
                <TableCell>{new Date(purchase.created_at).toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No purchases found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default PurchasesTable;
