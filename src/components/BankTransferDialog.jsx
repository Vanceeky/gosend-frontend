import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const BankTransferDialog = ({ open, onClose }) => {
  const [banks, setBanks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedRail, setSelectedRail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;

  useEffect(() => {
    const fetchBanksList = async () => {
      try {
        const response = await fetch(
          `http://${API_BASE_URL}/v1/topwallet/get-banks-list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error ${response.status}`);
        }

        const data = await response.json();
        const netBanks = data?.net_banks || {};

        const banksArray = Object.values(netBanks);
        setBanks(banksArray);
      } catch (error) {
        console.error("Failed to fetch banks:", error);
        toast.error("Failed to load bank list.");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      setLoading(true);
      fetchBanksList();
    }
  }, [open]);

  const filteredBanks = banks.filter((bank) =>
    `${bank.full_name} ${bank.swift_bic}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setSelectedRail(Object.keys(bank.settlement_rail)[0]);
  };

  const handleBack = () => {
    setSelectedBank(null);
    setAccountNumber("");
    setAmount("");
    setSelectedRail("");
  };

  const handleSubmit = () => {
    if (!accountNumber || !amount || !selectedRail) {
      toast.error("Please complete all fields.");
      return;
    }

    const selectedRailInfo = selectedBank.settlement_rail[selectedRail];

    const payload = {
      bank_name: selectedBank.full_name,
      bank_code: selectedRailInfo.bank_code,
      settlement_method: selectedRail,
      account_number: accountNumber,
      amount,
    };

    console.log("Submitting:", payload);
    toast.success("Transfer initiated!");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg">
        {!selectedBank ? (
          <>
            <DialogHeader>
              <DialogTitle>Select a Bank</DialogTitle>
            </DialogHeader>
            <Input
              type="text"
              placeholder="Search by name or bank code..."
              className="mb-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ScrollArea className="h-[300px]">
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="border rounded-lg p-4 space-y-2 animate-pulse"
                    >
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  ))}
                </div>
              ) : filteredBanks.length > 0 ? (
                <div className="space-y-3">
                  {filteredBanks.map((bank) => (
                    <div
                      key={bank.swift_bic}
                      className="border rounded-lg p-4 hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => handleBankSelect(bank)}
                    >
                      <div className="font-medium">{bank.full_name}</div>
                      <div className="text-sm text-muted-foreground">
                        Bank Code: {bank.swift_bic}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-center text-muted-foreground">
                  No banks found.
                </p>
              )}
            </ScrollArea>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{selectedBank.full_name}</DialogTitle>
              <DialogDescription>
                Fill in the transfer details below.
              </DialogDescription>
            </DialogHeader>

            <Label className="mt-2">Account Number</Label>
            <Input
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />

            <Label className="mt-2">Amount</Label>
            <Input
              placeholder="Enter amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Label className="mt-4 mb-2">Settlement Rail</Label>
            <RadioGroup
              value={selectedRail}
              onValueChange={(value) => setSelectedRail(value)}
              className="space-y-2"
            >
              {Object.entries(selectedBank.settlement_rail).map(
                ([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <RadioGroupItem value={key} id={key} />
                    <Label htmlFor={key}>
                      {value.name} ({value.bank_code})
                    </Label>
                  </div>
                )
              )}
            </RadioGroup>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BankTransferDialog;
