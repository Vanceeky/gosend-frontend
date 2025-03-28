import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // Import Sonner toast
import { set } from "date-fns";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function addAccountDialog({ onAccountAdded }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const handleCreateAccount = async () => {
    if (!mobileNumber || !username || !password || !accountType) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
      const response = await fetch(`http://${API_BASE_URL}/v1/admin/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile_number: mobileNumber,
          username: username,
          password: password,
          account_type: accountType
        }),
      });
  
      const result = await response.json(); // Parse JSON response
  
      console.log("API Response:", result);
      // If the request failed (API returned status "error")
      if (!response.ok || result.status === "error") {
        throw new Error(result.message || `Request failed with status: ${response.status}`);
      }
  
      toast.success(result.message || "Account created successfully!");
  
      // Notify parent component to refresh data
      onAccountAdded?.();
  
      // Reset form & close dialog
      setMobileNumber("");
      setUsername("");
      setPassword("");
      setAccountType("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }

  };
  
  

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
          <Separator />
        </DialogHeader>
        <div className="grid gap-4 py-2">

          <div className="grid w-full max-w-sm items-center gap-1.5">
              <Select value={accountType} onValueChange={setAccountType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Account Types</SelectLabel>
                      <SelectItem value="CUSTOMER_SUPPORT">CUSTOMER SUPPORT</SelectItem>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="INVESTOR">INVESTOR</SelectItem>
                    </SelectGroup>
                  </SelectContent>
              </Select>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="community-name">Mobile Number</Label>
            <Input
              type="text"
              id="mobile-number"
              placeholder="9*********"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="leader-number">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="go_send"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="leader-number">Password</Label>
            <Input
              type="password"
              id="username"
              placeholder="*****************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>




        </div>
        <DialogFooter>
          <Button onClick={handleCreateAccount} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
