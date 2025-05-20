{/* Generate Report Dialog */}
<Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Generate Excel Report</DialogTitle>
      <DialogDescription>
        Select a date range and file name for your activation report.
      </DialogDescription>
    </DialogHeader>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Date Range</label>
        <DatePickerWithRange
          date={dateRange}
          onDateChange={setDateRange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">File Name</label>
        <Input
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Enter file name"
        />
        <p className="text-xs text-muted-foreground mt-1">
          The report will be saved as an Excel (.xlsx) file
        </p>
      </div>
    </div>

    <DialogFooter>
      <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
        Cancel
      </Button>
      <Button onClick={generateExcelReport}>
        <Download className="mr-2 h-4 w-4" /> Generate Report
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>