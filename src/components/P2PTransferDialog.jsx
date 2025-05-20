import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const P2PTransferDialog = ({ open, onClose }) => {
  const [step, setStep] = useState("transfer"); // 'transfer' | 'otp'
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;

  const handleP2PTransfer = async () => {
    if (!/^9\d{9}$/.test(mobileNumber) || !amount) {
      toast.error("Please enter a valid mobile number and amount.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://${API_BASE_URL}/v1/topwallet/initiate_p2ptransfer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to_user: mobileNumber,
          amount,
          coin: "peso",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to initiate P2P transfer.");
      }

      const data = await response.json();
      setTransactionId(data.Transaction_id);
      setStep("otp");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessP2PTransfer = async () => {
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://${API_BASE_URL}/v1/topwalletprocess_p2ptransfer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Transaction_id: transactionId,
          otp,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to process P2P transfer.");
      }

      toast.success("P2P Transfer Successful!");
      resetState();
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setStep("transfer");
    setMobileNumber("");
    setAmount("");
    setOtp("");
    setTransactionId(null);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        resetState();
        onClose();
      }
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Peer-to-Peer Transfer</DialogTitle>
          <DialogDescription>
            {step === "transfer"
              ? <>Send funds to another <span className="text-orange-500">GoSend</span> member using their mobile number.</>
              : "Enter the OTP sent to your device to confirm the transaction."}
          </DialogDescription>
        </DialogHeader>

        {step === "transfer" ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="mobile">Recipient Mobile Number</Label>
              <Input
                id="mobile"
                placeholder="e.g. 9XXXXXXXXX"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={mobileNumber}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.length > 10) value = value.slice(0, 10);
                  if (value && value[0] !== "9") return;
                  setMobileNumber(value);
                }}
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleP2PTransfer} disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label>Transaction ID</Label>
              <Input readOnly value={transactionId} className="cursor-pointer" />
            </div>

            <div>
              <Label htmlFor="otp">OTP</Label>
              <InputOTP value={otp} onChange={(value) => setOtp(value.replace(/\D/g, ""))} maxLength={6}>
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep("transfer")} disabled={loading}>
                Back
              </Button>
              <Button onClick={handleProcessP2PTransfer} disabled={loading}>
                {loading ? "Processing..." : "Confirm Transfer"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default P2PTransferDialog;
