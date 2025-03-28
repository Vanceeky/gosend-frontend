import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";





const PurchasesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
               
                <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No purchases found.
                </TableCell>
                </TableRow>
               
            </TableBody>
            </Table>


        </>
  );
};

export default PurchasesTable;
