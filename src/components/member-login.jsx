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

import { toast } from "sonner";

export function LoginForm({ className, ...props }) {
  const [step, setStep] = useState("mobile"); // "mobile", "otp", "mpin"
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [mpin, setMpin] = useState("");
  const [expiredAt, setExpiredAt] = useState(null); // Store the expiration time
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable resend button initially
  const [accountType, setAccountType] = useState("");
  const [otpToken, setOtpToken] = useState(""); // Store OTP token from API
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState(""); // Error message



const handleMobileSubmit = async (e) => {
  e.preventDefault();
  
  if (mobile.length !== 10 || !accountType) {
    toast({
      title: "Error",
      description: "Please enter a valid 10-digit mobile number and select an account type.",
      variant: "destructive",
    });
    return;
  }

  setIsLoading(true);
  setError("");

  try {
    const url = new URL("http://192.0.0.2:9000/v1/auth/login");
    url.searchParams.append("mobile_number", mobile);
    url.searchParams.append("role", accountType.toUpperCase());

    const response = await fetch(url, {
      method: "POST",
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send OTP");
    }

    const data = await response.json();
    const { otp_token, otp } = data;

    setOtpToken(otp_token);
    setExpiredAt(new Date(Date.now() + 120 * 1000));
    setTimeLeft(120);
    setIsResendDisabled(true);
    setStep("otp");

    toast("OTP Sent", {
      description: `Your OTP has been sent to ${mobile}.`,
    });

  } catch (err) {
    toast("Error",{
      description: err.message || "Failed to send OTP. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

const handleOtpSubmit = async (e) => {
  e.preventDefault();

  if (otp.length !== 6) {
    toast("Error", {
      description: "OTP must be 6 digits.",
      variant: "destructive",
    });
    return;
  }

  setIsLoading(true);
  setError("");

  try {
    const url = new URL("http://192.0.0.2:9000/v1/auth/verify-otp");
    url.searchParams.append("mobile_number", mobile);
    url.searchParams.append("otp_token", otpToken);
    url.searchParams.append("input_otp", otp);

    const response = await fetch(url, {
      method: "POST",
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to verify OTP");
    }

    const data = await response.json();

    if (data.message === "OTP verified successfully") {
      setStep("mpin");

      toast("OTP Verified", {
        description: "Your OTP was successfully verified. Please enter your MPIN.",
      });
    }

  } catch (err) {
    toast("Error", {
      description: err.message || "Failed to verify OTP. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


  const handleMobileSubmit_main = async (e) => {
    e.preventDefault();
    if (mobile.length === 10 && accountType) {
      setIsLoading(true);
      setError("");
      try {
        // Construct the URL with query parameters
        const url = new URL("http://192.0.0.2:9000/v1/auth/login");
        url.searchParams.append("mobile_number", mobile);
        url.searchParams.append("role", accountType.toUpperCase());
  
        console.log("Request URL:", url.toString()); // Log the full URL
  
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "accept": "application/json", // Add the accept header
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json(); // Parse the error response
          console.error("Error response:", errorData);
          throw new Error(errorData.message || "Failed to send OTP");
        }
  
        const data = await response.json();
        const { otp_token, otp, message } = data;
        setOtpToken(otp_token); // Store OTP token
        setExpiredAt(new Date(Date.now() + 120 * 1000)); // Set expiration time
        setTimeLeft(120); // Reset timer to 2 minutes
        setIsResendDisabled(true); // Disable resend button
        setStep("otp"); // Move to OTP step
      } catch (err) {
        setError(err.message || "Failed to send OTP. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOtpSubmit_main = async (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      setIsLoading(true);
      setError("");
      try {
        // Construct the URL with query parameters
        const url = new URL("http://192.0.0.2:9000/v1/auth/verify-otp");
        url.searchParams.append("mobile_number", mobile);
        url.searchParams.append("otp_token", otpToken);
        url.searchParams.append("input_otp", otp);
  
        console.log("Request URL:", url.toString()); // Log the full URL
  
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "accept": "application/json", // Add the accept header
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json(); // Parse the error response
          console.error("Error response:", errorData);
          throw new Error(errorData.message || "Failed to verify OTP");
        }
  
        const data = await response.json();
        if (data.message === "OTP verified successfully") {
          setStep("mpin"); // Move to MPIN step
        }
      } catch (err) {
        setError(err.message || "Failed to verify OTP. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };


  const handleMpinSubmit = async (e) => {
    e.preventDefault();
  
    if (mpin.length !== 4) {
      toast({
        title: "Error",
        description: "MPIN must be 4 digits.",
        variant: "destructive",
      });
      return;
    }
  
    setIsLoading(true);
    setError("");
  
    try {
      const url = new URL("http://192.0.0.2:9000/v1/auth/verify-mpin");
      url.searchParams.append("mobile_number", mobile);
      url.searchParams.append("input_mpin", mpin);
      url.searchParams.append("role", accountType.toUpperCase());
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to verify MPIN");
      }
  
      const data = await response.json();
  
      // ✅ Save token & role in localStorage
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user_role", data.role);
      }
  
      // ✅ Show success message
      toast({
        title: "Success",
        description: "Login successful! Redirecting...",
      });
  
      // ✅ Redirect based on role
      setTimeout(() => {
        if (data.role === "MEMBER") {
          window.location.href = "/member";
        } else if (data.role === "ADMIN") {
          window.location.href = "/dashboard";
        } else if (data.role === "MERCHANT") {
          window.location.href = "/merchant";
        }
      }, 1500); // Delay redirection to show the toast
  
    } catch (err) {
      toast("Error", {
        description: err.message || "Failed to verify MPIN. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleMpinSubmit_copy_main = async (e) => {
    e.preventDefault();
    if (mpin.length === 4) {
      setIsLoading(true);
      setError("");
      try {
        const url = new URL("http://192.0.0.2:9000/v1/auth/verify-mpin");
        url.searchParams.append("mobile_number", mobile);
        url.searchParams.append("input_mpin", mpin);
        url.searchParams.append("role", accountType.toUpperCase());
  
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "accept": "application/json",
          },
          credentials: "include", // Ensure cookies are included
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to verify MPIN");
        }
  
        const data = await response.json();
  
        // ✅ Check if the cookie is set
        document.cookie.split(";").forEach((cookie) => {
          console.log("Stored Cookie:", cookie.trim());
        });
  
        // ✅ Save token in local storage (optional)
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token.access_token);
        }
  
        alert("Login successful! Redirecting...");
        
        // ✅ Redirect to /merchant
        window.location.href = "/merchant";
  
      } catch (err) {
        setError(err.message || "Failed to verify MPIN. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  
  const handleResendOtp = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_number: mobile,
          role: accountType.toUpperCase(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to resend OTP");
      }

      const data = await response.json();
      const { otp_token, otp, message } = data;
      setOtpToken(otp_token); // Store new OTP token
      setExpiredAt(new Date(Date.now() + 120 * 1000)); // Reset expiration time
      setTimeLeft(120); // Reset timer to 2 minutes
      setIsResendDisabled(true); // Disable resend button
    } catch (err) {
      setError(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

      {error && (
        <div className="text-center text-sm text-red-500">
          {error}
        </div>
      )}

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
                <SelectItem value="MEMBER">Member</SelectItem>
                <SelectItem value="MERCHANT">Merchant</SelectItem>
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
              disabled={otp.length !== 6 || isLoading} // Disable if OTP is incomplete or loading
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
          ) : (
            <Button
              type="button"
              className="w-full"
              onClick={handleResendOtp}
              disabled={isResendDisabled || isLoading} // Disable if resend is not allowed or loading
            >
              {isLoading ? "Resending..." : "Resend OTP"}
            </Button>
          )
        ) : (
          <Button
            type="submit"
            className="w-full"
            disabled={
              (step === "mobile"
                ? mobile.length !== 10 || !accountType
                : mpin.length !== 4) || isLoading
            }
          >
            {isLoading
              ? "Loading..."
              : step === "mobile"
              ? "Send OTP"
              : "Login Account"}
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