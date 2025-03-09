import React from 'react'
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
const TransactionsTable = () => {

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Sample demo data
// Sample transactions data
// Sample transactions with rewards data
const transactions = [
  { 
    id: "txn_001", 
    name: "John Doe", 
    amount: 100.50, 
    referenceId: "REF12345", 
    status: "Pending",
    rewards: [
      { receiver: "Alice Brown", points: 10, type: "Referral Bonus" },
      { receiver: "Bob Green", points: 5, type: "Level 2 Bonus" }
    ]
  },
  { 
    id: "txn_002", 
    name: "Jane Smith", 
    amount: 250.75, 
    referenceId: "REF67890", 
    status: "Completed",
    rewards: [
      { receiver: "Charlie Blue", points: 15, type: "Referral Bonus" },
      { receiver: "Dave Black", points: 8, type: "Level 2 Bonus" }
    ]
  }
];

  const getAvatarFallback = (name) => {
    const words = name.split(" ");
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center gap-4">
          
          <CardTitle>List of Transactions</CardTitle>
          <Input placeholder="Search reference ID..." className="w-[300px]" />
        </div>
      </CardHeader>

      <CardContent>
        {/* Table */}
        <div className="overflow-auto h-[60vh] border rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reference ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarFallback>{getAvatarFallback(txn.name).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {txn.name}
                    </div>
                  </TableCell>
                  <TableCell>₱{txn.amount.toFixed(2)}</TableCell>
                  <TableCell>{txn.referenceId}</TableCell>
                  <TableCell>{txn.status}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSelectedTransaction(txn)}>
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Dialog for transaction details */}
          <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reference ID: {selectedTransaction?.referenceId}</DialogTitle>
              </DialogHeader>

              {selectedTransaction && (
                <div className="space-y-4">
                  {/* Rewards Table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Receiver</TableHead>
                        <TableHead>Reward Points</TableHead>
                        <TableHead>Reward Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTransaction.rewards.map((reward, index) => (
                        <TableRow key={index}>
                          <TableCell>{reward.receiver}</TableCell>
                          <TableCell>{reward.points}</TableCell>
                          <TableCell>{reward.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Footer with total amount and total rewards */}
              <DialogFooter className=" p-4 border-t">
                {selectedTransaction && (
                  <div className='flex justify-between items-center w-full'>
                    <div className="text-sm text-gray-600">
                      <strong>Total Amount:</strong> ${selectedTransaction.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Total Rewards Distributed:</strong> {selectedTransaction.rewards.reduce((sum, reward) => sum + reward.points, 0)} Points
                    </div>
                  </div>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
