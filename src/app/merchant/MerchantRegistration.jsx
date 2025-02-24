import { MerchantRegisterForm } from "@/components/merchant-reg-form";
import { useState } from "react";
import logo from "@/assets/gosend_logo.png";
import bg from "@/assets/gosend_bg.jpg";
import { Terminal, CheckCircle, XCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export default function MerchantRegistration() {
  const [alert, setAlert] = useState({ type: null, message: null });

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
              <img src={logo} alt="Logo" className="h-full w-full object-contain" />
            </div>
            GoSend+
          </a>
        </div>

        {/* Success Alert */}
        {alert.type === "success" && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {alert.type === "error" && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <MerchantRegisterForm setAlert={setAlert} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img src={bg} alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
}