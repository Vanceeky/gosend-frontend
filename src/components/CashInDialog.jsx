import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog"; // Adjust the import according to your project structure
import { ClipboardCopy } from "lucide-react"; // Make sure the icon is from Lucide
import instapay from "@/assets/image/Instapay-x-Pesonet.png"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"


import { toast } from "sonner";
 
  
const CashInDialog = ({ user, open, onClose }) => {


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            toast("Instapay ID copied!");
        })
        .catch((error) => {
            alert("Failed to copy!");
        });
};

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
          <h3 className="text-lg font-bold text-center">
            CASH IN - VIA INSTAPAY / PESONET
          </h3>
        </DialogTitle>

        <div className="flex justify-center">
          {/* Image of Instapay / Pesonet */}
          <img src={instapay} alt="Instapay / Pesonet" className="w-full h-48" />
        </div>

        <div className="text-center">
            <p className="text-sm text-dark/80 mb-1">Account Number:</p>

            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                    <span
                        className="font-mono text-lg text-dark tracking-wide bg-gray-100 rounded-md px-2 cursor-pointer text-nowrap"
                        onClick={() => copyToClipboard(user.InstapayId?.toString().replace(/\s/g, ''))} // Remove spaces when copying
                    >
                        {user.InstapayId
                        ?.toString() // Ensure it's a string
                        .split('') // Split into characters
                        .join('  ') // Add double spaces between characters
                        }
                    </span>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Copy Account Number</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>





        <div className="mt-4 text-sm">
          <p className="text-gray-700">TRANSFER INSTRUCTIONS:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Copy the account number above (This is your Top Wallet assigned account number).</li>
            <li>Open your online bank app and click on the tab to transfer funds through Instapay or Pesonet.</li>
            <li>Fill in the required details and paste your TopWallet account number in the ‘Beneficiary Account’ field.</li>
            <li>In the ‘Beneficiary Bank’ field, look for and select <span className="text-orange-500">NETBANK – CUOBPHM2XXX</span>.</li>
            <li>Enter the amount that is to be transferred to TopWallet.</li>
            <li>Click on the Instapay or Pesonet button to complete the transfer.</li>
          </ol>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default CashInDialog;
