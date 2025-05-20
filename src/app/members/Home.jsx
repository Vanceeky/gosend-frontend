import React, {useEffect, useState} from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { BadgeCheck, ClipboardCopy, User2, HandCoins, CreditCard, QrCode, XCircle, Landmark, Users } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import promoBanner from '@/assets/image/image1.jpg'
import  CashInDialog  from "@/components/CashInDialog"
import QrDialog from '@/components/QrDialog'
import BankTransferDialog from '@/components/BankTransferDialog'
import P2PTransferDialog from '@/components/P2PTransferDialog'


import { toast } from "sonner"


const Home = () => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    // Toggle the dialog open/close
    // Define separate states for each dialog
    const [isCashInDialogOpen, setIsCashInDialogOpen] = useState(false);
    const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
    const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
    const [isP2PTransferDialogOpen, setisP2PTransferDialogOpen] = useState(false)

    const toggleCashInDialog = () => setIsCashInDialogOpen(!isCashInDialogOpen);
    const toggleQrDialog = () => setIsQrDialogOpen(!isQrDialogOpen);
    const toggleTransferDialog = () => setIsTransferDialogOpen(!isTransferDialogOpen);
    const toggleP2PTransferDialog = () => setisP2PTransferDialogOpen(!isP2PTransferDialogOpen);
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try{
                const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
                const response = await fetch(`http://${API_BASE_URL}/v1/topwallet/get_profile`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Error ${response.status}`);
                }
        
                const data = await response.json();
                console.log("API Response:", data);

        
                setUser(data); // Set user state with fetched data

                // 2. Fetch QR code (assuming a separate endpoint)
                const qrResponse = await fetch(
                  `http://${API_BASE_URL}/v1/topwallet/generate/qrph`, // Adjust endpoint
                  {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                  }
                );

                if (!qrResponse.ok) throw new Error("Failed to generate QR code");

                const qrData = await qrResponse.json();

                // Convert Buffer data to Base64 (as in previous solution)
                const bufferData = qrData.success.data;
                const uint8Array = new Uint8Array(bufferData);
                const base64String = btoa(
                  String.fromCharCode.apply(null, uint8Array)
                );
                setQrCodeUrl(`data:image/png;base64,${base64String}`);

            } catch (err) {
                if (err.name === "AbortError") {
                  console.log("Fetch aborted");
                } else {
                  console.error("Fetch error:", err);
                  setError(err.message || "Failed to fetch user details. Please try again.");
                }
              } finally {
                setLoading(false);
              }
        };
        fetchUserInfo();
    }, []);


    

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!user) return <p className="text-red-500">User not found</p>;
  

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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Left Section (8 columns) */}
      <div className="md:col-span-8 space-y-6">
        {/* Promo Banner */}
        <div className="rounded-2xl overflow-hidden h-[250px] relative">
          <img
            src={promoBanner}
            alt="Promo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm text-white flex flex-col justify-center p-6">
            <h2 className="text-3xl font-bold">
              <span className="text-orange-400">Stay</span> Earn{' '}
              <span className="text-orange-400">CONNECTED</span>
            </h2>
            <p className="text-sm mt-2 max-w-md">
              Install the GoSend app for secure and safe financial transactions. Pass your referral link among your family, friends and earn exciting rewards.
            </p>
          </div>
        </div>


        {/* ShadCN Tabs Component inside Card */}
        <Card className="rounded-2xl shadow-md p-4">

            <Tabs defaultValue="cash-in">
                <TabsList className="flex space-x-4 border-b">
                <TabsTrigger value="cash-in" className="flex-1 text-sm text-orange-500 py-2 text-center">Cash-In</TabsTrigger>
                <TabsTrigger value="my-qr" className="flex-1 text-sm text-orange-500 py-2 text-center">Cash-Out</TabsTrigger>
                <TabsTrigger value="visa-mastercard" className="flex-1 text-sm text-orange-500 py-2 text-center">Bills & Loads</TabsTrigger>
                </TabsList>

                <TabsContent value="cash-in">
                    <div className="flex flex-col p-4 space-y-6">
                        {/* Horizontal row of icon buttons */}
                        <div className="flex justify-around space-x-4">
                            {/* BANK/INSTAPAY/PESONET Button */}
                            <div className="flex flex-col items-center space-y-2">
                                <button
                                className="p-3 rounded-full hover:bg-orange-500 transition-colors group"
                                onClick={toggleCashInDialog} // Toggle dialog on click
                                >
                                <HandCoins className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
                                </button>
                                <span className="text-sm font-medium text-gray-700">BANK/ INSTAPAY/ PESONET</span>
                            </div>

                            {/* CashInDialog with user data passed as prop */}
                            <CashInDialog user={user} open={isCashInDialogOpen} onClose={toggleCashInDialog} />


                            {/* MY QR */}
                            <div className="flex flex-col items-center space-y-2">
                                <button className="p-3 rounded-full hover:bg-orange-500 transition-colors group" onClick={toggleQrDialog}>
                                <QrCode className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
                                </button>
                                <span className="text-sm font-medium text-gray-700">MY QR</span>
                                <QrDialog 
                                  user={user} 
                                  open={isQrDialogOpen} 
                                  onClose={toggleQrDialog} 
                                  qrCodeUrl={qrCodeUrl} 
                              />
                            </div>

                        </div>

                    </div>
                </TabsContent>

                <TabsContent value="my-qr">
                    <div className="flex flex-col p-4 space-y-6">
                        {/* Horizontal row of icon buttons */}
                        <div className="flex justify-around space-x-4">
                          {/* BANK/INSTAPAY/PESONET */}
                          <div className="flex flex-col items-center space-y-2">
                              <button className="p-3 rounded-full hover:bg-orange-100 transition-colors" onClick={toggleTransferDialog}>
                              <Landmark className="w-8 h-8 text-orange-500" />
                              </button>
                              <span className="text-sm font-medium text-gray-700">Bank Transfer</span>
                              <BankTransferDialog 
                                  user={user} 
                                  open={isTransferDialogOpen} 
                                  onClose={toggleTransferDialog} 
                              />
                          </div>

                          {/* MY QR */}
                          <div className="flex flex-col items-center space-y-2">
                              <button className="p-3 rounded-full hover:bg-orange-100 transition-colors" onClick={toggleP2PTransferDialog}>
                              <Users className="w-8 h-8 text-orange-500" />
                              </button>
                              <span className="text-sm font-medium text-gray-700">Peer to Peer</span>
                              <P2PTransferDialog 
                                  open={isP2PTransferDialogOpen} 
                                  onClose={toggleP2PTransferDialog} 
                              />
                          </div>

                        </div>

                    </div>
                </TabsContent>

                <TabsContent value="visa-mastercard">
                    <div className="flex flex-col p-4 space-y-6">
                        {/* Horizontal row of icon buttons */}
                        <div className="flex justify-around space-x-4">
                        {/* BANK/INSTAPAY/PESONET */}
                        <div className="flex flex-col items-center space-y-2">
                            <button className="p-3 rounded-full hover:bg-orange-100 transition-colors">
                            <CreditCard className="w-8 h-8 text-orange-500" />
                            </button>
                            <span className="text-sm font-medium text-gray-700">BANK Transfer</span>
                        </div>

                        {/* MY QR */}
                        <div className="flex flex-col items-center space-y-2">
                            <button className="p-3 rounded-full hover:bg-orange-100 transition-colors">
                            <QrCode className="w-8 h-8 text-orange-500" />
                            </button>
                            <span className="text-sm font-medium text-gray-700">Peer to Peer</span>
                        </div>

                        </div>

                    </div>
                </TabsContent>
            </Tabs>
        </Card>




      </div>

      {/* Right Section (4 columns) */}
      <div className="md:col-span-4 space-y-6">
        {/* Balance Card */}
        <Card className="rounded-2xl overflow-hidden relative bg-gradient-to-br from-orange-600 to-orange-400 h-[200px] text-white shadow-2xl">
          <svg
            className="absolute top-0 right-0 w-full h-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            fill="none"
          >
            <path
              fill="#fff"
              d="M50,-60C63,-47,70,-31,76,-13C81,6,84,25,75,40C66,55,45,66,26,72C7,78,-10,80,-26,75C-41,70,-56,59,-65,44C-74,29,-76,10,-73,-9C-69,-28,-60,-47,-46,-59C-31,-72,-16,-77,1,-78C18,-79,36,-75,50,-60Z"
              transform="translate(100 100)"
            />
          </svg>

          <CardContent className="relative z-10 h-full flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-white/80">Available Balance</p>
                        <h2 className="text-4xl font-bold">
                        {parseFloat(user.Balances.peso).toFixed(2)} {/* Format the balance to two decimal places */}
                        </h2>
                    </div>

                    {user.KYC_Status ? (
                        <div className="flex items-center text-white space-x-1">
                        <BadgeCheck className="w-5 h-5" />
                        <span className="text-sm font-medium">Verified</span>
                        </div>
                    ) : (
                        <div className="flex items-center text-red-500 space-x-1">
                        <XCircle className="w-5 h-5" /> {/* Assuming you want a red X icon for unverified */}
                        <span className="text-sm font-medium">Unverified</span>
                        </div>
                    )}
                </div>


            <div className="mt-6">
              <p className="text-sm text-white/80 mb-1">Account Number</p>
              <div className="flex items-center justify-between bg-white/30 backdrop-blur-md rounded-md px-3 py-2">
                <span className="font-mono tracking-wider text-sm">{user.InstapayId}</span>
                <ClipboardCopy
                  className="w-4 h-4 cursor-pointer text-white hover:text-white/90"
                  onClick={() => copyToClipboard(user.InstapayId?.toString().replace(/\s/g, ''))}
                />
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Quick Profile Info */}
        <Card className="rounded-2xl p-6 shadow-md text-gray-700">
          <div className="flex items-center space-x-3">
            <User2 className="w-6 h-6 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Member Name</p>
              <h4 className="font-semibold">{user.Name}</h4>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Home


