import { useState, useRef, useEffect  } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function ConfirmActivation({ user, onActivateSuccess  }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [referenceId, setReferenceId] = useState(null);
  const [otp, setOtp] = useState("");
  const [memberId, setMemberId] = useState(null);
  const [step, setStep] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const authToken = localStorage.getItem("token");
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    if (confirmButtonRef.current) {
      confirmButtonRef.current.focus(); // Focus the button when the dialog opens
    }
  }, []);

  const handleInitiateActivation = async () => {
    setIsProcessing(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
      const response = await fetch(`http:///${API_BASE_URL}/v1/admin/initiate-member-activation`, {
        method: "POST",
        credentials: "include",
        headers: { 
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ user_id: user.user_id }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setReferenceId(data.data.Transaction_id);
        setMemberId(user.id);
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
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    setIsProcessing(true);
    
    try {
      const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
      const response = await fetch(`http:///${API_BASE_URL}/v1/admin/process-member-activation`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Transaction_id: referenceId, // Ensure correct field name
          otp_code: otp,
          member_id: memberId,
        }),
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (data.status === 'success') {
        toast.success(data.message || "Member activation processed successfully");
  
        setIsDialogOpen(false); // Close the dialog
  
        console.log("Calling onActivateSuccess with:", memberId, data.data.success); // Debugging
        onActivateSuccess(memberId); 
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
            <DialogDescription className="text-red-900">
              Activating this account will deduct ₱175 from your wallet balance. Continue?
            </DialogDescription>
            <div className="space-y-2">
              <Label>Member Name</Label>
              <Input type="text" value={user.name} readOnly className="cursor-pointer" />

            </div>
            <div className="space-y-2">
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
              <Input type="hidden" value={memberId} readOnly className="cursor-pointer" />
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
            <Button ref={confirmButtonRef} onClick={handleProcessActivation} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Activate"}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
