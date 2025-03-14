"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { SearchSlash } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const rewardsData = [
  { id: "R001", transactionId: "T123", date: "2025-03-01", points: 50, status: "claimed", conditions: "Valid for 6 months", expiration: "2024-09-01", time: "14:30" },
  { id: "R002", transactionId: "T124", date: "2025-03-05", points: 30, status: "pending", conditions: "Valid for 3 months", expiration: "2024-06-05", time: "10:15" },
  { id: "R003", transactionId: "T125", date: "2025-03-10", points: 20, status: "claimed", conditions: "Valid for 1 year", expiration: "2025-03-10", time: "08:45" },
  { id: "R004", transactionId: "T126", date: "2025-03-15", points: 40, status: "pending", conditions: "No expiration", expiration: "N/A", time: "17:20" },
  { id: "R005", transactionId: "T127", date: "2025-03-20", points: 10, status: "claimed", conditions: "Valid for 2 years", expiration: "2026-03-20", time: "12:00" },
];

const Rewards = () => {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [page, setPage] = useState(1);
  const [selectedReward, setSelectedReward] = useState(null);
  const itemsPerPage = 10;

  const clearDateRange = () => setDateRange({ from: null, to: null });

  const filteredRewards = rewardsData.filter((reward) => {
    const rewardDate = new Date(reward.date); // Convert reward date to Date object
    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;

    const matchesSearch =
      search === "" || reward.transactionId.toLowerCase().includes(search.toLowerCase());

    const matchesDate =
      (!fromDate || rewardDate >= fromDate) &&
      (!toDate || rewardDate <= new Date(toDate.setHours(23, 59, 59, 999))); // Ensure full day range

    return matchesSearch && matchesDate;
  });


  const paginatedRewards = filteredRewards.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filteredRewards.length / itemsPerPage);

  return (
    <Card className="p-4 w-full max-w-[100%] h-auto md:h-[600px] mx-auto flex flex-col">
      <CardContent className="space-y-4 flex-grow flex flex-col">
        <h2 className="text-2xl font-bold text-center md:text-left">Reward History</h2>

        {/* Search & Date Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search by Transaction ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />

          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full md:w-[250px] justify-start text-left font-normal",
                    !dateRange.from && !dateRange.to && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from && dateRange.to ? (
                    <span className="text-[11px] truncate">
                    {format(new Date(dateRange.from), "PPP")} - {format(new Date(dateRange.to), "PPP")}
                  </span>
                  
                  ) : (
                    "Pick a date range"
                  )}

                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="range" selected={dateRange} onSelect={setDateRange} initialFocus />
              </PopoverContent>
            </Popover>

            {/* Clear Date Range Button with Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={clearDateRange} className="flex items-center justify-center w-full md:w-[50px]">
                  <SearchSlash className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear Date Range</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Table Container with Scroll */}
        <div className="flex-grow overflow-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Reward ID</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date Earned</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRewards.map((reward) => (
                <TableRow key={reward.id} onClick={() => setSelectedReward(reward)} className="cursor-pointer">
                  <TableCell>{reward.id}</TableCell>
                  <TableCell>{reward.transactionId}</TableCell>
                  <TableCell>{reward.date}</TableCell>
                  <TableCell>{reward.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Fixed Pagination at the Bottom */}
        <div className="w-full flex justify-center mt-4">
          <Pagination className="flex justify-center">
            <PaginationContent>
              <PaginationPrevious onClick={() => setPage(page - 1)} disabled={page === 1} />
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink onClick={() => setPage(i + 1)} isActive={page === i + 1}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationNext onClick={() => setPage(page + 1)} disabled={page === totalPages} />
            </PaginationContent>
          </Pagination>
        </div>

        {/* Dialog Modal */}
        <Dialog open={!!selectedReward} onOpenChange={() => setSelectedReward(null)}>
          <DialogContent>
            <DialogTitle>Reward Details</DialogTitle>
            {selectedReward && (
              <DialogDescription>
                <p><strong>Reward ID:</strong> {selectedReward.id}</p>
                <p><strong>Transaction ID:</strong> {selectedReward.transactionId}</p>
                <p><strong>Points Earned:</strong> {selectedReward.points}</p>
                <p><strong>Status:</strong> {selectedReward.status}</p>
                <p><strong>Conditions:</strong> {selectedReward.conditions}</p>
                <p><strong>Expiration Date:</strong> {selectedReward.expiration}</p>
                <p><strong>Date & Time Earned:</strong> {selectedReward.date} {selectedReward.time}</p>
              </DialogDescription>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Rewards;