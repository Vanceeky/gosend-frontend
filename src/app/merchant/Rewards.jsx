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
    <>
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
    </>
  );
};

export default Rewards;