import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold">Oops! Something went wrong.</h1>
      <p className="text-gray-500 mt-2">The page you are looking for might have been moved or does not exist.</p>
      <Button className="mt-4" onClick={() => navigate("/")}>Go Back Home</Button>
    </div>
  );
}

export default ErrorPage;
