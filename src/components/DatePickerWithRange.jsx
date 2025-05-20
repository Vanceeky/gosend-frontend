import { useState } from "react";
import { format } from "date-fns";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { CalendarIcon, Eraser } from "lucide-react";

export default function DateRangePicker({ dateRange, setDateRange }) {
  const clearDateRange = () => setDateRange({ from: null, to: null });

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full md:w-[250px] justify-start text-left font-normal cursor-pointer ${
              !dateRange.from && !dateRange.to ? "text-muted-foreground" : ""
            }`}
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

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={clearDateRange} className="flex items-center justify-center w-full md:w-[50px]">
            <Eraser className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Clear Date Range</TooltipContent>
      </Tooltip>
    </div>
  );
}