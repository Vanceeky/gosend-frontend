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

    // Toggle the dialog open/close
    // Define separate states for each dialog
    const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
    const [isP2PTransferDialogOpen, setisP2PTransferDialogOpen] = useState(false)

    const toggleTransferDialog = () => setIsTransferDialogOpen(!isTransferDialogOpen);
    const toggleP2PTransferDialog = () => setisP2PTransferDialogOpen(!isP2PTransferDialogOpen);


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

            <Tabs defaultValue="my-qr">
                <TabsList className="flex space-x-4 border-b">
                <TabsTrigger value="my-qr" className="flex-1 text-sm text-orange-500 py-2 text-center">Cash-Out</TabsTrigger>
                <TabsTrigger value="visa-mastercard" className="flex-1 text-sm text-orange-500 py-2 text-center">Convert Rewards</TabsTrigger>
                </TabsList>


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
                        <p className="text-sm text-white/80">Reward Points</p>
                        <h2 className="text-4xl font-bold">100 {/* Format the balance to two decimal places */}
                        </h2>
                    </div>

                </div>


            <div className="mt-6">
              <p className="text-sm text-white/80 mb-1">Wallet Balance</p>
              <div className="flex items-center justify-between bg-white/30 backdrop-blur-md rounded-md px-3 py-2">
                <span className="font-mono tracking-wider text-sm">₱ 100</span>
                <ClipboardCopy
                  className="w-4 h-4 cursor-pointer text-white hover:text-white/90"
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
              <p className="text-sm text-gray-500">Hub Name</p>
              <h4 className="font-semibold">Hub</h4>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Home


