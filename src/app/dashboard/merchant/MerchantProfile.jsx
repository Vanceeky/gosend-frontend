import { useState } from "react";
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
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ExternalLinkIcon, Copy } from "lucide-react"
import  TransactionsTable from "./TransactionsTable"

import { QrCode } from "lucide-react";

export default function MerchantProfile() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("transactions");

  return (
    <div className="flex justify-center h-screen">
      <div className="w-full flex gap-4">
        {/* User Info & Tabs Card (8/12) */}
        <Card className="w-full md:w-8/12 flex flex-col">
         
            <CardHeader className="">
              
              <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
                <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                  <AvatarFallback>BB</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold flex items-center gap-1 flex-wrap sm:flex-nowrap">

                  <span className="truncate cursor-pointer hover:underline">



                    <Dialog>
                      <DialogTrigger asChild>
                        <span>Merchant Name</span>
                      </DialogTrigger>
                      <DialogContent className="w-full mx-auto px-4 sm:px-6 rounded-lg"> {/* Fixed width */}
                        <DialogHeader>
                          <DialogTitle>Merchant Name</DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>

                        <Tabs defaultValue="account">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="account">Account</TabsTrigger>
                              <TabsTrigger value="address">Address</TabsTrigger>
                            </TabsList>

                            {/* Account Tab */}
                            <TabsContent value="account" className="w-full h-[405px] overflow-y-auto"> {/* Fixed height and scrollable */}
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
                                        <div className="text-2xl font-bold">₱ 8,512</div>
                                      </CardContent>
                                    </Card>

                                    {/* Reward Points Card */}
                                    <Card className="p-4">
                                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                                        <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
                                        <WalletMinimal className="h-4 w-4 text-muted-foreground" />
                                      </CardHeader>
                                      <CardContent className="p-0">
                                        <div className="text-2xl font-bold">1,279</div>
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
                                        <CardFooter className="text-center">
                                            
                                        </CardFooter>
                                    </Card>

                                </CardContent>
                              </Card>
                            </TabsContent>

                            {/* Address Tab */}
                            <TabsContent value="address" className="w-full h-[405px] overflow-y-auto"> {/* Fixed height and scrollable */}
                              <Card>
                                <CardContent className="space-y-2">
                                  {/* House Number and Street Name (Side by Side) */}
                                  <div className="grid grid-cols-[4fr_8fr] gap-4 mt-3">
                                    <div className="space-y-1">
                                      <Label htmlFor="house-number">House Number</Label>
                                      <Input
                                        id="house-number"
                                        type="text"
                                        readOnly
                                        defaultValue="1234"
                                        className="w-full cursor-pointer"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label htmlFor="street-name">Street Name</Label>
                                      <Input
                                        id="street-name"
                                        type="text"
                                        readOnly
                                        defaultValue="Main Street"
                                        className="w-full cursor-pointer"
                                      />
                                    </div>
                                  </div>

                                  {/* Barangay */}
                                  <div className="space-y-1">
                                    <Label htmlFor="current">Barangay</Label>
                                    <Input id="current" readOnly type="text" />
                                  </div>

                                  {/* City / Municipality */}
                                  <div className="space-y-1">
                                    <Label htmlFor="new">City / Municipality</Label>
                                    <Input id="new" readOnly type="text" />
                                  </div>

                                  {/* Province */}
                                  <div className="space-y-1">
                                    <Label htmlFor="current">Province</Label>
                                    <Input id="current" readOnly type="text" />
                                  </div>

                                  {/* Region */}
                                  <div className="space-y-1">
                                    <Label htmlFor="new">Region</Label>
                                    <Input id="new" readOnly type="text" />
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
                      <p className="text-xs sm:text-sm text-gray-500">Manger: James Ivan Mingarine</p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="text-gray-500 hover:text-gray-700">
                            <ExternalLinkIcon className="w-4 h-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          View Profile
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>
     


              {/* Right: Popover (on small screens) & TabsList (on medium+ screens) */}
              <div className="flex items-center">
                {/* Popover button (only visible on small screens) */}
                <div className="block md:hidden">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" sideOffset={10} className="w-48">
                      <div className="flex flex-col space-y-2">
                        <Button variant="ghost" className="w-full text-left" onClick={() => setActiveTab("transactions")}>
                          Cash in / Cash Out
                        </Button>
                        <Button variant="ghost" className="w-full text-left" onClick={() => setActiveTab("purchases")}>
                          Purchases
                        </Button>
                        <Button variant="ghost" className="w-full text-left" onClick={() => setActiveTab("rewards")}>
                          Rewards
                        </Button>
                        <Separator />
                        <Button variant="ghost" className="w-full text-left" onClick={() => setIsSheetOpen(true)}>
                          Referred Users
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>


              </div>
              </div>


              

            </CardHeader>

            <Separator />
            
            <CardContent className="flex-1 overflow-y-auto p-4">

                <TransactionsTable/>

            </CardContent>
   
        </Card>

        {/* Referred Users - Sheet for small screens */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="right" className="w-100">
            <Card>
              <CardHeader>
                <CardTitle>Referred Users</CardTitle>
                <CardDescription>List of users you have referred.</CardDescription>
              </CardHeader>
              <CardContent>

              </CardContent>
            </Card>
          </SheetContent>
        </Sheet>

        {/* Referred Users Card for large screens */}
        <Card className="hidden md:flex w-4/12 flex-col">
          <CardHeader>
            <CardTitle>Referred Users</CardTitle>
            <CardDescription>List of users you have referred.</CardDescription>
          </CardHeader>
          <CardContent>
        
          </CardContent>
        </Card>

      </div>
    </div>
  );
}