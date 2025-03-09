import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Circle } from "lucide-react"; // For the circular progress indicator
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function LoginForm({ className, ...props }) {
  const [step, setStep] = useState("mobile"); // "mobile", "otp", "mpin"
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [mpin, setMpin] = useState("");
  const [expiredAt, setExpiredAt] = useState(null); // Store the expiration time
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable resend button initially
  const [accountType, setAccountType] = useState("");

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      // Simulate API call to initiate login
      const response = {
        status: "success",
        data: {
          otp_code: "848404",
          expired_at: new Date(Date.now() + 120 * 1000).toISOString(), // 2 minutes from now // CHANGE IT TO 120
        },
        message: "OTP sent successfully!",
      };
      setExpiredAt(new Date(response.data.expired_at)); // Set expiration time
      setTimeLeft(120); // Reset timer to 2 minutes // 120 seconds
      setIsResendDisabled(true); // Disable resend button
      setStep("otp");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      // Simulate OTP verification
      setStep("mpin");
    }
  };

  const handleMpinSubmit = (e) => {
    e.preventDefault();
    if (mpin.length === 4) {
      alert("Successfully logged in!");
    }
  };

  const handleResendOtp = () => {
    // Simulate resending OTP
    const response = {
      status: "success",
      data: {
        otp_code: "848404",
        expired_at: new Date(Date.now() + 120 * 1000).toISOString(), // 2 minutes from now
      },
      message: "OTP sent successfully!",
    };
    setExpiredAt(new Date(response.data.expired_at)); // Set new expiration time
    setTimeLeft(120); // Reset timer to 2 minutes
    setIsResendDisabled(true); // Disable resend button
  };

  // Countdown timer logic
  useEffect(() => {
    if (!expiredAt) return;

    const interval = setInterval(() => {
      const now = new Date();
      const remainingTime = Math.floor((expiredAt - now) / 1000); // Time left in seconds
      setTimeLeft(remainingTime > 0 ? remainingTime : 0);

      if (remainingTime <= 0) {
        clearInterval(interval);
        setIsResendDisabled(false); // Enable resend button when timer runs out
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [expiredAt]);

  // Ensure only numeric input for OTP and MPIN
  const handleNumericInput = (value, setter) => {
    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    setter(numericValue);
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={
        step === "mobile"
          ? handleMobileSubmit
          : step === "otp" && timeLeft > 0 // Only allow OTP submission if time is left
          ? handleOtpSubmit
          : handleMpinSubmit
      }
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Login to your GoSend account
        </p>
      </div>

      <div className="grid gap-6">
        {step === "mobile" && (
          <div className="grid gap-2">
            {/* Account Type Selection */}
            <Label htmlFor="account-type">Sign in as:</Label>
            <Select onValueChange={setAccountType} className="">
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="merchant">Merchant</SelectItem>
                <SelectItem value="community_leader">Community Leader</SelectItem>
              </SelectContent>
            </Select>

            <Separator className="my-2" />

            {/* Mobile Number Input */}
            <Label htmlFor="mobile">Mobile Number:</Label>
            <div className="flex items-center gap-1 p-1">
              <span className="text-gray-500">+63</span>
              <Input
                id="mobile"
                type="tel"
                placeholder="9*********"
                maxLength={10}
                inputMode="numeric"
                className="flex-1 border-none focus:ring-0"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                autoFocus
              />
            </div>
          </div>
        )}

        {step === "otp" && (
          <div className="grid gap-2">
            <Label htmlFor="otp" className="text-center">
              One-Time Password
            </Label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => handleNumericInput(value, setOtp)}
                pattern="\d*" // Ensure only numbers are allowed
                autoFocus
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Please enter the one-time password sent to your phone.
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center items-center gap-2">
              <div className="relative w-12 h-12">
                <Circle className="w-full h-full text-gray-300" strokeWidth={2} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium">{timeLeft}s</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "mpin" && (
          <div className="grid gap-2">
            <Label htmlFor="mpin" className="text-center">
              Enter your 4-digit MPIN
            </Label>
            <div className="flex justify-center">
              <Input
                id="mpin"
                type="password" // Use password type to mask the input
                placeholder="****"
                maxLength={4}
                inputMode="numeric"
                className="w-48 text-center" // Adjust width and center text
                required
                value={mpin}
                onChange={(e) => handleNumericInput(e.target.value, setMpin)}
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Dynamic Button */}
        {step === "otp" ? (
          timeLeft > 0 ? (
            <Button
              type="submit"
              className="w-full"
              disabled={otp.length !== 6} // Disable if OTP is incomplete
            >
              Verify OTP
            </Button>
          ) : (
            <Button
              type="button"
              className="w-full"
              onClick={handleResendOtp}
              disabled={isResendDisabled} // Disable if resend is not allowed
            >
              Resend OTP
            </Button>
          )
        ) : (
          <Button
            type="submit"
            className="w-full"
            disabled={
              step === "mobile"
                ? mobile.length !== 10 || !accountType
                : mpin.length !== 4
            }
          >
            {step === "mobile" ? "Send OTP" : "Login Account"}
          </Button>
        )}
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Become a Member
        </Link>
      </div>
    </form>
  );
}