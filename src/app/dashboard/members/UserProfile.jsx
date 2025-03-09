import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ShieldCheckIcon, ShieldXIcon, MoreVertical, ExternalLink, Wallet, WalletMinimal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react"
import TransactionTable from "./components/TransactionTable";
import PurchasesTable from "./components/PurchasesTable";
import RewardsTable from "./components/RewardsTable";
import { ReferredUsers } from "./components/ReferredUsers";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("transactions");
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
        const response = await fetch(

          `http://${API_BASE_URL}:8000/v1/users/info/${user_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [user_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;


  return (
    
    <div className="flex justify-center h-screen">
        {user && (
          <div className="w-full flex gap-4">
            {/* User Info & Tabs Card (8/12) */}
            <Card className="w-full md:w-8/12 flex flex-col">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
                <CardHeader className="">
                  
                  <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
                    <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                      <AvatarFallback>    
                        {user.first_name?.charAt(0).toUpperCase()}
                        {user.last_name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base sm:text-lg font-semibold flex items-center gap-1 flex-wrap sm:flex-nowrap">

                      <span className="truncate cursor-pointer hover:underline">



                        <Dialog>
                          <DialogTrigger asChild>
                            <span className="capitalize">{user.first_name} {user.middle_name} {user.last_name} {user.suffix_name}</span>
                          </DialogTrigger>
                          <DialogContent className="w-full mx-auto px-4 sm:px-6 rounded-lg"> {/* Fixed width */}
                            <DialogHeader>
                              <DialogTitle className="capitalize">{user.first_name} {user.middle_name} {user.last_name} {user.suffix_name}</DialogTitle>
                              <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <div>
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
                                            <div className="text-2xl font-bold">₱ {user.wallet_balance}</div>
                                          </CardContent>
                                        </Card>

                                        {/* Reward Points Card */}
                                        <Card className="p-4">
                                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
                                            <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
                                            <WalletMinimal className="h-4 w-4 text-muted-foreground" />
                                          </CardHeader>
                                          <CardContent className="p-0">
                                            <div className="text-2xl font-bold">{user.reward_points}</div>
                                          </CardContent>
                                        </Card>
                                      </div>

                                      <Separator />

                                      {/* Read-only User ID with Copy Button */}
                                      <div className="flex flex-col gap-1 mt-3">
                                        <Label htmlFor="user-id" className="text-sm font-medium">
                                          User ID
                                        </Label>
                                        <div className="flex items-center gap-2">
                                          <Input id="user-id" value={user.user_id} readOnly className="w-full cursor-pointer" />
                                          <Button type="button" size="sm" className="px-3">
                                            <span className="sr-only">Copy</span>
                                            <Copy className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </div>

                                      {/* Mobile Number and Account Type (Side by Side) */}
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <Label htmlFor="mobile">Mobile Number</Label>
                                          <Input id="mobile" type="text" readOnly value={user.mobile_number} className="w-full cursor-pointer" />
                                        </div>
                                        <div className="space-y-1">
                                          <Label htmlFor="account-type">Account Type</Label>
                                          <Input id="account-type" type="text" readOnly value={user.account_type} className="w-full cursor-pointer" />
                                        </div>
                                      </div>

                                      <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                          <span className="w-full border-t" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                          <span className="bg-background px-2 text-muted-foreground">
                                            Community
                                          </span>
                                        </div>
                                      </div>

                                      {/* Community Name */}
                                      <div className="flex flex-col gap-1 mt-3">
                                        <Label htmlFor="user-id" className="text-sm font-medium">
                                          Community Name
                                        </Label>
                                        <div className="flex items-center gap-2">
                                          <Input id="user-id" value={user.community_name} readOnly className="w-full cursor-pointer" />
                                          <Button type="button" size="sm" className="px-3">
                                            <span className="sr-only">View</span>
                                            <ExternalLink className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </div>
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
                                            value={user.house_number}
                                            className="w-full cursor-pointer"
                                          />
                                        </div>
                                        <div className="space-y-1">
                                          <Label htmlFor="street-name">Street Name</Label>
                                          <Input
                                            id="street-name"
                                            type="text"
                                            readOnly
                                            value={user.street_name}
                                            className="w-full cursor-pointer"
                                          />
                                        </div>
                                      </div>

                                      {/* Barangay */}
                                      <div className="space-y-1">
                                        <Label htmlFor="current">Barangay</Label>
                                        <Input id="current" value={user.barangay} readOnly type="text" />
                                      </div>

                                      {/* City / Municipality */}
                                      <div className="space-y-1">
                                        <Label htmlFor="new">City / Municipality</Label>
                                        <Input id="new" value={user.city} readOnly type="text" />
                                      </div>

                                      {/* Province */}
                                      <div className="space-y-1">
                                        <Label htmlFor="current">Province</Label>
                                        <Input id="current" value={user.province} readOnly type="text" />
                                      </div>

                                      {/* Region */}
                                      <div className="space-y-1">
                                        <Label htmlFor="new">Region</Label>
                                        <Input id="new" value={user.region} readOnly type="text" />
                                      </div>
                                    </CardContent>
                                  </Card>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </DialogContent>
                        </Dialog>


                      </span>



                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {user.is_activated ? (
                              <ShieldCheckIcon className="text-green-500 cursor-pointer" />
                            ) : (
                              <ShieldXIcon className="text-red-500 cursor-pointer" />
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            {user.is_activated ? "Member is activated" : "Member is not activated"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      </h2>
                      <TooltipProvider>
                        <div className="flex items-center gap-2">
                          <p className="text-xs sm:text-sm text-gray-500">Referral ID: {user.referral_id}</p>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-gray-500 hover:text-gray-700">
                                <Copy className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Copy Referral Link
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

                    {/* TabsList (only visible on medium+ screens) */}
                    <TabsList className="hidden md:flex space-x-2 ml-auto">
                      <TabsTrigger value="transactions">Cash in / Cash Out</TabsTrigger>
                      <TabsTrigger value="purchases">Purchases</TabsTrigger>
                      <TabsTrigger value="rewards">Rewards</TabsTrigger>
                    </TabsList>
                  </div>
                </div>


                  

                </CardHeader>

                <Separator />
                
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <TabsContent value="transactions" hidden={activeTab !== "transactions"}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>View all your transactions here.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <TransactionTable />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="purchases" hidden={activeTab !== "purchases"}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Purchases</CardTitle>
                        <CardDescription>View your purchase history.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <PurchasesTable />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="rewards" hidden={activeTab !== "rewards"}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Rewards History</CardTitle>
                        <CardDescription>Check your earned rewards.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <RewardsTable/>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </CardContent>
              </Tabs>
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
                <ReferredUsers/>
              </CardContent>
            </Card>

          </div>
        )}
    </div>

  );
}