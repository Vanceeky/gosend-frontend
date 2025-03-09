import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function ConfirmActivation({ user, onActivateSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [referenceId, setReferenceId] = useState(null);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const authToken = localStorage.getItem("token");

  const handleInitiateActivation = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("http://192.168.1.11:8000/v1/users/initiate-member-activation", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${authToken}` 
        },
        body: JSON.stringify({ user_id: user.user_id }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setReferenceId(data.data.Transaction_id);
        setStep(2);
      } else {
        toast.error(data.message || "Failed to initiate activation");
      }
    } catch (error) {
      console.error("Error initiating activation:", error);
      toast.error("Server error. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessActivation = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("http://192.168.1.11:8000/v1/users/process-member-activation", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${authToken}` 
        },
        body: JSON.stringify({ reference_id: referenceId, otp_code: otp }),
      });
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Activation successful");
        setIsDialogOpen(false); // Close dialog on success
        onActivateSuccess(user.user_id); // Update table
      } else {
        toast.error(data.message || "Activation failed");
      }
    } catch (error) {
      console.error("Error processing activation:", error);
      toast.error("Server error. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Activate Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Activate Account</DialogTitle>
        </DialogHeader>
        {step === 1 ? (
          <>
            <DialogDescription>
              Activating this account will deduct ₱175 from your wallet balance. Continue?
            </DialogDescription>
            <div className="space-y-1">
              <Label>Member Name</Label>
              <Input type="text" value={user.name} readOnly className="cursor-pointer" />
            </div>
            <div className="space-y-3">
              <Label>Mobile Number</Label>
              <Input type="text" value={user.mobile_number} readOnly className="cursor-pointer" />
            </div>
            <Button onClick={handleInitiateActivation} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Confirm"}
            </Button>
          </>
        ) : (
          <>
            <DialogDescription>Enter the OTP to complete activation.</DialogDescription>
            <div className="space-y-2">
              <Label>Reference ID</Label>
              <Input type="text" value={referenceId} readOnly className="cursor-pointer" />
              <Label>OTP</Label>
              <InputOTP value={otp} onChange={(value) => setOtp(value.replace(/\D/g, ""))} maxLength={6}>
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button onClick={handleProcessActivation} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Activate"}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
