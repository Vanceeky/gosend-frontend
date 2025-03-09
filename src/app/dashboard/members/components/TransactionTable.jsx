import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";



const transactions = [
  { receiver: "John Doe", amount: "$100", type: "Cash In", status: "Completed", reference_id: "ABC123", date_created: "2024-03-01" },
  { receiver: "Jane Smith", amount: "$50", type: "Cash In", status: "Pending", reference_id: "XYZ456", date_created: "2024-03-02" },
  { receiver: "Alice Brown", amount: "$75", type: "Cash Out", status: "Failed", reference_id: "LMN789", date_created: "2024-03-03" }
];


const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  
  const paginatedData = transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  return (
        <>
        
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Receiver</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference ID</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedData.map((transaction, index) => (
                <TableRow key={index}>
                    <TableCell>{transaction.receiver}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                    <TableCell>{transaction.reference_id}</TableCell>
                    <TableCell>{transaction.date_created}</TableCell>
                    <TableCell>
                    <Button size="sm" variant="outline">View</Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>

            <Pagination>
            <PaginationContent>
                {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                    <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    >
                    {i + 1}
                    </PaginationLink>
                </PaginationItem>
                ))}
            </PaginationContent>
            </Pagination>

        </>
  );
};

export default TransactionTable;
