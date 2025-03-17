import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { ShieldCheckIcon, MoreVertical, ExternalLink, Wallet, WalletMinimal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ExternalLinkIcon, Copy } from "lucide-react"
import  TransactionsTable from "./Transactions"
import Rewards from "./Rewards";

import { QrCode } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("transactions");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [merchant, setMerchant] = useState(null);
  
  const merchant_id = "a7d821a5-adc9-49bd-a6b7-8bccf606c886";
  
  useEffect(() => {
    const fetchMerchantDetails = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
        const response = await fetch(
          `http://${API_BASE_URL}/v1/merchant/${merchant_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch merchant details");
        }
        const data = await response.json();
        console.log(data);
        console.log(data.data.merchant_id); // Corrected this line
        setMerchant(data.data); // Set correct data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMerchantDetails();
  }, [merchant_id]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div className="flex justify-center h-screen">
      <div className="w-full flex gap-4">
        {/* User Info & Tabs Card (8/12) */}
        <Card className="w-full">
        <Tabs defaultValue="transactions" >
          <CardHeader className="grid grid-cols-12 gap-6">
            {/* Merchant INFO - Takes 6 columns */}
            <div className="col-span-6 flex flex-wrap items-center gap-4 sm:flex-nowrap">
              <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                <AvatarFallback>
                  {merchant.business_name
                    .split(" ")
                    .slice(0, 2)
                    .map(word => word.charAt(0))
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h2 className="text-base sm:text-lg font-semibold flex items-center gap-1 flex-wrap sm:flex-nowrap">
                  <span className="truncate cursor-pointer hover:underline">
                    <Dialog>
                      <DialogTrigger asChild>
                        <span>{merchant?.business_name}</span>
                      </DialogTrigger>
                      <DialogContent className="w-full mx-auto px-4 sm:px-6 rounded-lg">
                        <DialogHeader>
                          <DialogTitle>{merchant?.business_name}</DialogTitle>
                        </DialogHeader>

                        <Tabs defaultValue="account">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="address">Address</TabsTrigger>
                          </TabsList>

                          {/* Account Tab */}
                          <TabsContent value="account" className="w-full h-[405px] overflow-y-auto">
                            <Card className="w-full">
                              <CardContent className="space-y-4 w-full">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-3">
                                  {/* Wallet Balance Card */}
                                  <Card className="p-4">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                                      <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                                      <Wallet className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent className="p-0">
                                      <div className="text-2xl font-bold">₱ {merchant.merchant_wallet}</div>
                                    </CardContent>
                                  </Card>

                                  {/* Reward Points Card */}
                                  <Card className="p-4">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                                      <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
                                      <WalletMinimal className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent className="p-0">
                                      <div className="text-2xl font-bold">{merchant.reward_points}</div>
                                    </CardContent>
                                  </Card>
                                </div>

                                <Separator />

                                {/* Merchant QR CODE */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Merchant QR Code</CardTitle>
                                  </CardHeader>
                                  <CardContent className="flex justify-center">
                                    <QrCode size={100} className="text-gray-500" />
                                  </CardContent>
                                </Card>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          {/* Address Tab */}
                          <TabsContent value="address" className="w-full h-[405px] overflow-y-auto">
                            <Card>
                              <CardContent className="space-y-2">
                                <div className="space-y-1 mt-2">
                                  <Label htmlFor="street-name">Street Name</Label>
                                  <Input id="street-name" type="text" readOnly defaultValue={merchant.details.street} className="w-full cursor-pointer" />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor="barangay">Barangay</Label>
                                  <Input id="barangay" readOnly type="text" defaultValue={merchant.details.barangay} className="w-full cursor-pointer" />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor="city_municipality">City / Municipality</Label>
                                  <Input id="city_municipality" readOnly type="text" defaultValue={merchant.details.municipality_city} className="w-full cursor-pointer" />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor="province">Province</Label>
                                  <Input id="province" readOnly type="text" defaultValue={merchant.details.province} className="w-full cursor-pointer" />
                                </div>
                                <div className="space-y-1">
                                  <Label htmlFor="region">Region</Label>
                                  <Input id="region" readOnly type="text" defaultValue={merchant.details.region} className="w-full cursor-pointer" />
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </span>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ShieldCheckIcon className="text-green-500 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>Member is activated</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h2>

                <TooltipProvider>
                  <div className="flex items-center gap-2">
                    <p className="text-xs sm:text-sm text-gray-500">{merchant.member.full_name}</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link to={`/dashboard/member/${merchant.member.member_id}`} className="text-gray-500 hover:text-gray-700">
                          <ExternalLinkIcon className="w-4 h-4" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>View Profile</TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
            </div>

            {/* Tablist - Takes 6 columns */}
            <div className="col-span-6 hidden md:flex justify-end">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="conversions">Conversions</TabsTrigger>
              </TabsList>
            </div>

            {/* Popover button (only visible on small/medium screens) */}
            <div className="col-span-6 block md:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" sideOffset={10} className="w-48">
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" className="w-full text-left" onClick={() => setActiveTab("transactions")}>
                      Transactions
                    </Button>
                    <Button variant="ghost" className="w-full text-left" onClick={() => setActiveTab("rewards")}>
                      Rewards
                    </Button>
                    <Button variant="ghost" className="w-full text-left" onClick={() => setActiveTab("conversions")}>
                      Conversions
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>



            <Separator />
            
            <CardContent className="flex-1 overflow-y-auto p-4">

                  <TabsContent value="transactions">
                    <TransactionsTable/>
                  </TabsContent>
                  <TabsContent value="rewards">
                    <Rewards/>
                  </TabsContent>


            </CardContent>

              </Tabs>

        </Card>



      </div>
    </div>
  );
}