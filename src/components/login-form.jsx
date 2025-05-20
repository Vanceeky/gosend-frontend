import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

export function LoginForm({ className, ...props }) {
  
  const { account_url } = useParams(); // Get account URL from the route
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors
  
    if (!account_url) {
      toast.error("Invalid account URL.");
      return;
    }
  
    try {
      const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
      const response = await fetch(`http://${API_BASE_URL}/v1/admin/${account_url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Include cookies (if applicable)
      });
  
      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }
  
      const data = await response.json();
      console.log("API Response", data)
  
      // Extract nested data
      const userData = data.data; // Adjusting for the nested structure
  
      if (!userData || !userData.access_token || !userData.account_type) {
        throw new Error("Invalid response from server.");
      }
  
      // Store token and account type
      localStorage.setItem("access_token", userData.access_token);
      localStorage.setItem("account_type", userData.account_type);
  
      toast.success("Login successful!");
  
      console.log(userData.account_type);
      console.log(userData.access_token);
  
      // Redirect based on account type
      if (userData.account_type === "CUSTOMER_SUPPORT") {
        navigate("/customer-support");
      } else if (userData.account_type === "ADMIN") {
        navigate("/dashboard");
      } else if (userData.account_type === "INVESTOR") {
        navigate("/investor");
      } else {
        throw new Error("Invalid account type.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleLogin}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials below to login to your account.
        </p>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="gosend_admin"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            placeholder="************"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
